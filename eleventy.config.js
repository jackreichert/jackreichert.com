import crypto from "node:crypto";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import CleanCSS from "clean-css";
import { HtmlBasePlugin } from "@11ty/eleventy";
import {
  SRCSET_WIDTHS,
  variantPath,
  MAX_WIDTH,
  publicWebpPath,
} from "./scripts/lib/images.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(ROOT, "assets", "images");
const CSS_SOURCE = path.join(ROOT, "assets", "css", "style.css");

// Minify + content-hash CSS once per build so templates can reference a
// long-cacheable, cache-busted URL (GitHub Pages / Cloudflare can cache forever).
const cssSource = fs.readFileSync(CSS_SOURCE, "utf8");
const cssMinified = new CleanCSS({ level: 2 }).minify(cssSource);
if (cssMinified.errors?.length) {
  console.warn("CSS minify warnings/errors:", cssMinified.errors);
}
const cssBody = cssMinified.styles || cssSource;
const cssHash = crypto.createHash("sha1").update(cssBody).digest("hex").slice(0, 10);
const cssFileName = `style.${cssHash}.css`;
const cssHref = `/assets/css/${cssFileName}`;

function imageSrcset(src, { webp = false } = {}) {
  if (!src || typeof src !== "string" || !src.startsWith("/assets/images/")) return "";
  let name = path.basename(src);
  if (/-\d+w\.(?:jpe?g|png|webp)$/i.test(name)) return "";

  if (webp) {
    const webpName = path.basename(publicWebpPath(src));
    if (!fs.existsSync(path.join(IMAGES_DIR, webpName))) return "";
    name = webpName;
    src = `/assets/images/${webpName}`;
  }

  const parts = [];
  for (const w of SRCSET_WIDTHS) {
    const vName = path.basename(variantPath(name, w));
    if (fs.existsSync(path.join(IMAGES_DIR, vName))) {
      parts.push(`/assets/images/${vName} ${w}w`);
    }
  }
  // Always include the master as the largest candidate.
  parts.push(`${src} ${MAX_WIDTH}w`);
  // Only useful when at least one smaller variant exists (or webp master alone).
  if (parts.length === 1 && !webp) {
    // Still return master-only for completeness when no variants (rare).
  }
  return parts.join(", ");
}

/**
 * Build a <picture> (WebP source + fallback img) for a local /assets/images path.
 */
function responsivePicture(src, {
  className = "",
  alt = "",
  sizes = "(max-width: 56rem) 100vw, 56rem",
  width = 1600,
  height = 900,
  fetchpriority = "",
  loading = "",
  decoding = "async",
} = {}) {
  if (!src) return "";
  const fallbackSrcset = imageSrcset(src);
  const webpSrcset = imageSrcset(src, { webp: true });
  const attr = (name, value) => (value ? ` ${name}="${String(value).replace(/"/g, "&quot;")}"` : "");
  const imgAttrs =
    attr("class", className) +
    attr("src", src) +
    (fallbackSrcset ? attr("srcset", fallbackSrcset) : "") +
    attr("sizes", sizes) +
    attr("alt", alt) +
    attr("width", width) +
    attr("height", height) +
    attr("fetchpriority", fetchpriority) +
    attr("loading", loading) +
    attr("decoding", decoding);

  if (!webpSrcset) {
    return `<img${imgAttrs}>`;
  }
  return (
    `<picture>` +
    `<source type="image/webp" srcset="${webpSrcset}" sizes="${sizes}">` +
    `<img${imgAttrs}>` +
    `</picture>`
  );
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Images + fonts as-is; CSS is emitted minified+hashed in eleventy.after.
  eleventyConfig.addPassthroughCopy({ "assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "assets/fonts": "assets/fonts" });

  eleventyConfig.addGlobalData("buildYear", () => new Date().getUTCFullYear());
  eleventyConfig.addGlobalData("cssHref", cssHref);
  // WordPress.com stats loader is week-stamped (e-YYYYWW.js) for cache busting
  eleventyConfig.addGlobalData("statsWeek", () => {
    const d = new Date();
    const utcDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    // ISO-8601 week number/year prevents rollover bugs at year boundaries.
    const day = utcDate.getUTCDay() || 7;
    utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day);
    const isoYear = utcDate.getUTCFullYear();
    const yearStart = new Date(Date.UTC(isoYear, 0, 1));
    const week = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
    return `${isoYear}${String(week).padStart(2, "0")}`;
  });

  eleventyConfig.on("eleventy.after", async () => {
    const dir = path.join(ROOT, "_site", "assets", "css");
    await fsp.mkdir(dir, { recursive: true });
    await fsp.writeFile(path.join(dir, cssFileName), cssBody);
  });

  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("scripts/**");
  // project/tooling docs — never publish
  eleventyConfig.ignores.add("PRODUCT.md");
  eleventyConfig.ignores.add("DESIGN.md");
  eleventyConfig.ignores.add(".impeccable/**");

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("content/posts/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("pages", (api) => api.getFilteredByGlob("content/pages/*.md"));

  // One entry per category (excluding "Uncategorized"): { name, slug, posts }, posts newest-first.
  eleventyConfig.addCollection("categories", (api) => {
    const slugify = eleventyConfig.getFilter("slugify");
    const posts = api.getFilteredByGlob("content/posts/*.md").sort((a, b) => b.date - a.date);
    const bySlug = new Map();
    for (const post of posts) {
      const cats = (post.data.categories || []).filter((c) => c !== "Uncategorized");
      for (const name of cats) {
        const slug = slugify(name);
        if (!bySlug.has(slug)) bySlug.set(slug, { name, slug, posts: [] });
        bySlug.get(slug).posts.push(post);
      }
    }
    return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
  });

  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("realCategories", (categories) =>
    (categories || []).filter((c) => c !== "Uncategorized")
  );
  // WP excerpts end in a "[…]" marker (sometimes cut mid-way); render a clean ellipsis
  eleventyConfig.addFilter("excerptClean", (text) => {
    const t = (text || "").replace(/\s*\[…?\]?\s*$/, "…").trim();
    return /[.!?…"”]$/.test(t) ? t : t + "…";
  });
  // A description is a deck only when it's hand-written (auto-excerpts end in "[…]"
  // or get cut mid-sentence without terminal punctuation).
  eleventyConfig.addFilter("deckLine", (text) => {
    const t = (text || "").trim();
    if (!t || /\[…?\]?$/.test(t) || !/[.!?…"”]$/.test(t)) return "";
    return t;
  });
  // Hide the deck when it repeats the opening paragraph of the post body.
  eleventyConfig.addFilter("deckDuplicatesIntro", (deck, html) => {
    const normalize = (s) =>
      String(s || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/[\s\u00A0]+/g, " ")
        .trim()
        .toLowerCase();

    const introMatch = String(html || "").match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const intro = introMatch ? introMatch[1] : "";
    const a = normalize(deck);
    const b = normalize(intro);
    if (!a || !b) return false;
    return a === b || a.startsWith(b) || b.startsWith(a);
  });
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 230))} min read`;
  });
  // Convert raw imported quote + attribution paragraphs into semantic testimonial blocks.
  eleventyConfig.addFilter("formatTestimonials", (html) => {
    const input = String(html || "");
    // Only transform immediate paragraph pairs (<p>quote</p><p>— attribution</p>).
    // This avoids swallowing intro paragraphs into the first quote block.
    return input.replace(
      /<p>((?:(?!<\/?p\b).|<(?!\/?p\b)[^>]+>|\n|\r)*)<\/p>\s*<p>\s*([―—-]\s*(?:(?!<\/p>).|\n|\r)*?)<\/p>/g,
      (_m, quote, attribution) =>
        `<figure class="testimonial-quote"><blockquote><p>${quote.trim()}</p></blockquote><figcaption>${attribution.trim()}</figcaption></figure>`
    );
  });
  eleventyConfig.addFilter("year", (date) => new Date(date).getUTCFullYear());
  eleventyConfig.addFilter("monthName", (date) =>
    new Date(date).toLocaleDateString("en-US", { month: "long", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("groupByYear", (posts) => {
    const groups = new Map();
    for (const post of posts) {
      const y = new Date(post.date).getUTCFullYear();
      if (!groups.has(y)) groups.set(y, []);
      groups.get(y).push(post);
    }
    return [...groups.entries()].map(([year, items]) => ({ year, items }));
  });
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("imageSrcset", (src) => imageSrcset(src));
  eleventyConfig.addFilter("imageWebpSrcset", (src) => imageSrcset(src, { webp: true }));
  eleventyConfig.addFilter("imageWebp", (src) => {
    const w = publicWebpPath(src);
    if (!w || w === src) return "";
    return fs.existsSync(path.join(IMAGES_DIR, path.basename(w))) ? w : "";
  });

  // {{ src | responsivePicture({ className: "image-heading", sizes: "100vw", ... }) | safe }}
  eleventyConfig.addFilter("responsivePicture", (src, opts = {}) =>
    responsivePicture(src, opts || {})
  );

  // Enrich in-body <img> tags: WebP <picture>, lazy-load, measure-sized srcset.
  eleventyConfig.addTransform("responsiveBodyImages", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html") || typeof content !== "string") return content;
    return content.replace(/<img\b([^>]*?)>/gi, (full, attrs) => {
      // Skip images already wrapped or already using picture/srcset from templates.
      if (/\bsrcset\s*=/i.test(attrs) || /\bclass=["'][^"']*image-heading/i.test(attrs)) {
        return full;
      }
      const srcMatch = attrs.match(/\bsrc=(["'])(\/assets\/images\/[^"']+)\1/i);
      if (!srcMatch) return full;
      const src = srcMatch[2];
      if (/-\d+w\./i.test(src)) return full;

      const altMatch = attrs.match(/\balt=(["'])(.*?)\1/i);
      const alt = altMatch ? altMatch[2] : "";
      const classMatch = attrs.match(/\bclass=(["'])(.*?)\1/i);
      const className = classMatch ? classMatch[2] : "";
      const widthMatch = attrs.match(/\bwidth=(["']?)(\d+)\1/i);
      const heightMatch = attrs.match(/\bheight=(["']?)(\d+)\1/i);

      return responsivePicture(src, {
        className,
        alt,
        sizes: "(max-width: 56rem) 100vw, 56rem",
        width: widthMatch ? widthMatch[2] : "",
        height: heightMatch ? heightMatch[2] : "",
        loading: "lazy",
        decoding: "async",
      });
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
    templateFormats: ["md", "njk", "html"],
    // Post bodies come from WP and may contain {{ }} in code samples —
    // don't run them through a template engine.
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}

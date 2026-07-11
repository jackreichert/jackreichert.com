import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addGlobalData("buildYear", () => new Date().getUTCFullYear());
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

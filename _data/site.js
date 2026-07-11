// Site identity + WordPress source. This is the ONE file to edit when
// standing up another site on this pattern (then swap the design:
// assets/css/style.css and the _includes templates).
//
// Read by Eleventy as the global `site` object, and by scripts/sync.mjs.
export default {
  // Identity (templates)
  name: "Jack Reichert",
  tagline: "Full Stack Philosopher",
  author: "Jack Reichert",
  // Canonical production URL, no trailing slash (feed, absolute links).
  url: "https://jackreichert.com",
  description:
    "Full Stack Philosopher — essays on code, design, and everything in between since 2010.",
  locale: "en_US",
  // Shown in the footer next to the copyright line; design-specific, so keep it here.
  footerNote: "Set in Cormorant Garamond & Montserrat.",

  // Social and crawler metadata.
  social: {
    // Optional @handle values used for twitter:site and twitter:creator.
    xSite: "",
    xCreator: "",
    // Optional fallback share image when a page has no featured image.
    defaultImage: "",
    defaultImageAlt: "Jack Reichert",
    defaultImageWidth: 1200,
    defaultImageHeight: 630,
  },

  profiles: {
    // Public profile URLs for Person.sameAs structured data.
    sameAs: [],
  },

  verification: {
    // Add values from Google Search Console / Bing Webmaster Tools.
    google: "",
    bing: "",
  },

  robots: {
    // Set false if you want to disallow listed AI crawlers.
    aiCrawlAllowed: true,
    aiBots: ["GPTBot", "CCBot", "ClaudeBot", "PerplexityBot"],
  },

  // WordPress.com source + stats
  wpcom: {
    // Site identifier for the WP REST API (content sync) and stats `srv` param.
    site: "jackreichert.com",
    // WordPress.com blog ID for the stats beacon.
    // Find it: https://public-api.wordpress.com/rest/v1.1/sites/<domain> → "ID".
    // Set to null to disable stats entirely.
    blogId: 5617142,
  },
};

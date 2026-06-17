import fs from "fs";
import path from "path";

const DOMAIN = "https://lankatoursdirect.com";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/tours", priority: "0.9", changefreq: "weekly" },
  { path: "/destinations", priority: "0.9", changefreq: "weekly" },
  { path: "/experiences", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/reviews", priority: "0.7", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/gallery", priority: "0.6", changefreq: "monthly" },
];

function extractSlugs(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

export default function viteSitemapPlugin() {
  return {
    name: "vite-plugin-sitemap",
    apply: "build",
    writeBundle() {
      const toursFile = path.resolve("src/data/tours.js");
      const destinationsFile = path.resolve("src/data/destinations.js");

      const tourSlugs = extractSlugs(toursFile);
      const destSlugs = extractSlugs(destinationsFile);

      const today = new Date().toISOString().split("T")[0];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      for (const route of STATIC_ROUTES) {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}${route.path}</loc>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `  </url>\n`;
      }

      for (const slug of tourSlugs) {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/tours/${slug}</loc>\n`;
        xml += `    <priority>0.85</priority>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `  </url>\n`;
      }

      for (const slug of destSlugs) {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/destinations/${slug}</loc>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `  </url>\n`;
      }

      xml += `</urlset>\n`;

      const outDir = path.resolve("public/sitemap.xml");
      fs.writeFileSync(outDir, xml, "utf-8");
      console.log(`[vite-plugin-sitemap] Generated sitemap at ${outDir} (${tourSlugs.length} tours, ${destSlugs.length} destinations)`);
    },
  };
}

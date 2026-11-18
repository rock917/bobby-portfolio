import { readFile, writeFile, mkdir } from "node:fs/promises";
import { loadEnv } from "vite";
import { projects } from "../src/data/content.ts";
import { resolveSiteOrigin, renderMetadata } from "./deployment-metadata.mjs";

const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const origin = resolveSiteOrigin(env);
const preview = Boolean(env.VERCEL_ENV && env.VERCEL_ENV !== "production");
const template = await readFile("dist/index.html", "utf8");
const pages = [{
  pathname: "/",
  title: "Bobby Ahirwar — Beyond the Code",
  description: "Bobby Ahirwar's universe of AI, machine learning, and software projects. Explore CodeLens AI, DocuMind AI, Ledgerly, and FeedbackIQ.",
  file: "dist/index.html",
}, ...projects.map((project) => ({
  pathname: `/projects/${project.slug}`,
  title: `${project.name} — Bobby Ahirwar`,
  description: project.summary,
  file: `dist/projects/${project.slug}.html`,
}))];
await mkdir("dist/projects", { recursive: true });
for (const page of pages) {
  await writeFile(page.file, renderMetadata(template, { ...page, origin, preview }));
}
// Only known public URLs belong in a sitemap; local builds invent no domain.
if (origin && !preview) {
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${origin}${page.pathname}</loc></url>`).join("\n")}\n</urlset>\n`);
}
await writeFile("dist/robots.txt", preview
  ? "User-agent: *\nDisallow: /\n"
  : `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`);
console.log(`Prepared ${pages.length} page metadata documents. ${origin ? "Public origin configured." : "Local build: domain metadata deferred until deployment."}`);

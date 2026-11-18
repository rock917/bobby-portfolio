import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolveSiteOrigin, renderMetadata } from "./deployment-metadata.mjs";
import { projects } from "../src/data/content.ts";

const template = await readFile(new URL("../index.html", import.meta.url), "utf8");
const page = { title: 'A & B <project> "test"', description: 'A "quoted" description & details', pathname: "/projects/codelens-ai", origin: "https://portfolio.example" };

test("local builds do not invent a production origin", () => {
  assert.equal(resolveSiteOrigin({}), "");
  const html = renderMetadata(template, { ...page, origin: "" });
  assert.doesNotMatch(html, /rel="canonical"|property="og:url"|portfolio:origin/);
});
test("explicit domain takes precedence over Vercel's production domain", () => {
  assert.equal(resolveSiteOrigin({ SITE_URL: " https://bobby.example/ ", VERCEL_PROJECT_PRODUCTION_URL: "fallback.vercel.app" }), "https://bobby.example");
  assert.equal(resolveSiteOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "fallback.vercel.app" }), "https://fallback.vercel.app");
});
test("invalid domain configuration stops the build", () => {
  for (const SITE_URL of ["not-a-url", "http://bobby.example", "https://bobby.example/path", "https://user:pass@bobby.example", "https://bobby.example/?q=1", "https://bobby.example/#home"]) {
    assert.throws(() => resolveSiteOrigin({ SITE_URL }));
  }
});
test("route metadata escapes content and supplies absolute URLs", () => {
  const html = renderMetadata(template, page);
  assert.match(html, /<title>A &amp; B &lt;project&gt; &quot;test&quot;<\/title>/);
  assert.match(html, /name="description" content="A &quot;quoted&quot; description &amp; details"/);
  assert.match(html, /rel="canonical" href="https:\/\/portfolio.example\/projects\/codelens-ai"/);
  assert.match(html, /property="og:image" content="https:\/\/portfolio.example\/images\/social-card.jpg"/);
  assert.match(html, /"url":"https:\/\/portfolio.example\/"/);
  assert.doesNotMatch(html, /name="robots"/);
});
test("Vercel preview pages opt out of indexing", () => {
  assert.match(renderMetadata(template, { ...page, preview: true }), /name="robots" content="noindex, nofollow"/);
});
test("every featured project has a deployable route before the SPA fallback", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  for (const project of projects) {
    assert.ok(config.rewrites.slice(0, -1).some((rule) => rule.source === `/projects/${project.slug}` && rule.destination === `/projects/${project.slug}.html`), project.slug);
  }
  assert.deepEqual(config.rewrites.at(-1), { source: "/(.*)", destination: "/index.html" });
});

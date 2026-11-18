export function resolveSiteOrigin(env) {
  const value = env.SITE_URL?.trim() ||
    (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  if (!value) return "";
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be a public HTTPS origin without a path, credentials, query, or fragment.");
  }
  return url.origin;
}

const escape = (value) => value.replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

export function renderMetadata(template, { title, description, pathname, origin, preview = false }) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  const tags = [
    ["name", "description", description],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:image", `${origin}/images/social-card.jpg`],
  ];
  for (const [attribute, key, value] of tags) {
    html = html.replace(new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/>`),
      `<meta ${attribute}="${key}" content="${escape(value)}" />`);
  }
  const extra = [
    '<meta property="og:image:alt" content="Bobby Ahirwar — Beyond the Code, a space-themed technology portfolio" />',
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    `<meta name="twitter:image" content="${escape(`${origin}/images/social-card.jpg`)}" />`,
  ];
  if (origin) {
    const pageUrl = escape(`${origin}${pathname}`);
    extra.push(`<meta name="portfolio:origin" content="${escape(origin)}" />`,
      `<link rel="canonical" href="${pageUrl}" />`,
      `<meta property="og:url" content="${pageUrl}" />`);
    html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,
      (_, open, json, close) => `${open}${JSON.stringify({ ...JSON.parse(json), url: `${origin}/` }).replace(/</g, "\\u003c")}${close}`);
  }
  if (preview) extra.push('<meta name="robots" content="noindex, nofollow" />');
  return html.replace("</head>", `${extra.join("\n    ")}\n  </head>`);
}

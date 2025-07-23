let config;

if (process.env.NODE_ENV === "production") {
  const prod = await import("./prod.js");
  config = prod.default;
} else {
  const dev = await import("./dev.js");
  config = dev.default;
}

export default config;

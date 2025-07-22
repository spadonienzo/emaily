import * as dev from "./dev.js";
import * as prod from "./prod.js";

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;

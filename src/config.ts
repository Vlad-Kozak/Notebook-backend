const { strict } = require("assert");
const convict = require("convict");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const config = convict({
  port: {
    doc: "Port to listen for clients requests",
    format: Number,
    default: 3000,
    env: "PORT",
  },
});

export const conf = config.validate({ allowed: strict }).getProperties();

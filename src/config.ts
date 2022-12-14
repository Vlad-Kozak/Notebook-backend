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
  dbUrl: {
    doc: "MongoDB connection URL",
    format: String,
    default: "",
    env: "DB_URL",
  },
  saltRounds: {
    doc: "saltRounds",
    format: Number,
    default: 12,
    env: "BCRYPT_SALT_ROUNDS",
  },
  secret: {
    doc: "JWT secret",
    format: String,
    default: "",
    env: "JWT_SECRET",
  },
  googleClientId: {
    doc: "google client id",
    format: String,
    default: "",
    env: "CLIENT_ID",
  },
  googleClientSecret: {
    doc: "google client secret",
    format: String,
    default: "",
    env: "CLIENT_SECRET",
  },
  googleRedirectUri: {
    doc: "google redirect uri",
    format: String,
    default: "",
    env: "REDIRECT_URI",
  },
});

export const conf = config.validate({ allowed: strict }).getProperties();

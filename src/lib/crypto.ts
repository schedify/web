import crypto from "node:crypto";

export enum Environment {
  TEST = 0,
  PROD = 1,
}

export function encryptWebhookSecret(env: Environment) {
  let prefix = "";
  if (env === Environment.TEST) {
    prefix = "sk_test_";
  } else if (env === Environment.PROD) {
    prefix = "sk_live_";
  }

  const randomString = crypto
    .randomBytes(48)
    .toString("base64")
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .slice(0, 64);

  return prefix + randomString;
}

import cuid2 from "@paralleldrive/cuid2";

export function cuid() {
  return cuid2.createId();
}

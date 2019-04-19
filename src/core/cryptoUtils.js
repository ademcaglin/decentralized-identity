import { str2ab } from "./baseUtils";

const salt = "e85c53e7f119d41fd7895cdc9d7bb9dd";

function getKeyMaterial(password) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
}

function getKey(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["wrapKey", "unwrapKey"]
  );
}

async function createKeys() {
  const keys = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256"
    },
    true,
    ["sign", "verify"]
  );
  return keys;
}

async function signWithKey(privateKey, data) {
  try {
    let signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: { name: "SHA-256" }
      },
      privateKey,
      str2ab(data)
    );
    if (signature) {
      return signature;
    }
  } catch (e) {
    console.log(`error: ${e}`);
    return undefined;
  }
}

async function wrapCryptoKey(keyToWrap, password) {
  const keyMaterial = await getKeyMaterial(password);
  let saltBuffer = Buffer.from(salt, "utf8");
  const wrappingKey = await getKey(keyMaterial, saltBuffer);
  let iv = saltBuffer.slice(12);
  let key = await window.crypto.subtle.wrapKey("jwk", keyToWrap, wrappingKey, {
    name: "AES-GCM",
    iv: iv
  });
  return key;
}

async function unwrapCryptoKey(wrapped, password) {
  const keyMaterial = await getKeyMaterial(password);
  let saltBuffer = Buffer.from(salt, "utf8");
  const wrappingKey = await getKey(keyMaterial, saltBuffer);
  let iv = saltBuffer.slice(12);
  let key = await window.crypto.subtle.unwrapKey(
    "jwk",
    wrapped,
    wrappingKey,
    {
      name: "AES-GCM",
      iv: iv
    },
    {
      name: "ECDSA",
      namedCurve: "P-256"
    },
    true,
    ["sign"]
  );

  return key;
}

export { createKeys, signWithKey, wrapCryptoKey, unwrapCryptoKey };

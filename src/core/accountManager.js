import Dexie from "dexie";
import { str2ab, ab2base64 } from "./baseUtils";
import {
  createKeys,
  wrapCryptoKey,
  unwrapCryptoKey,
  signWithKey
} from "./cryptoUtils";

const db = new Dexie("AccountDB");
db.version(1).stores({
  accounts: "id"
});

async function createAccount(name, surName, claims, password) {
  let keys = await createKeys();
  let wrappedKey = await wrapCryptoKey(keys.privateKey, password);
  db.accounts.add({
    id: 1,
    name: name,
    surName: surName,
    claims: claims,
    publicKey: keys.publicKey,
    privateKey: wrappedKey
  });
  return wrappedKey;
}

async function sign(data, password) {
  let account = await db.accounts.get(1);
  let key = await unwrapCryptoKey(account.privateKey, password);
  let signature = await signWithKey(key, data);
  return signature;
}

async function getPublicKey() {
  let account = await db.accounts.get(1);
  let key = await window.crypto.subtle.exportKey("spki", account.publicKey);
  return key;
}

async function createJwt(payload, password) {
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const unsignedToken = encodedHeader + "." + encodedPayload;
  const signature = await sign(unsignedToken, password);
  return encodedHeader + "." + encodedPayload + "." + ab2base64(signature);
}

async function setPassword(password) {
  let pwdHash = await crypto.subtle.digest("SHA-256", str2ab(password));
  sessionStorage.setItem("passwordHash", pwdHash);
}

export { createAccount, getPublicKey, createJwt, sign };

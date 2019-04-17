import Dexie from "dexie";
import { ab2base64 } from "./baseUtils";
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

async function createAccount(password) {
  let keys = await createKeys();
  let wrappedKey = await wrapCryptoKey(keys.privateKey, password);
  db.accounts.add({
    id: 1,
    publicKey: keys.publicKey,
    privateKey: wrappedKey
  });
  return wrappedKey;
}

async function resetAccount() {
  db.accounts.delete(1);
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

export { createAccount, getPublicKey, createJwt, sign, resetAccount };

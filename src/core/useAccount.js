import React, { useState } from "react";
import { createKeys, wrapCryptoKey } from "./cryptoUtils";
import Dexie from "dexie";
const db = new Dexie("AccountDB");
db.version(1).stores({
  accounts: "id"
});

export default () => {
  const [account, setAccount] = useState(async () => {
    try {
      const item = await db.accounts.get(1);
      return item;
    } catch (error) {
      console.log(error);
      return {};
    }
  });

  async function createAccount(password) {
    let keys = await createKeys();
    let wrappedKey = await wrapCryptoKey(keys.privateKey, password);
    /*let publicKey = ab2base64(
      await window.crypto.subtle.exportKey("spki", keys.publicKey)
    );*/
    db.accounts.add({
      id: 1,
      publicKey: keys.publicKey,
      wrappedKey: wrappedKey
    });
    setAccount({
      wrappedKey: wrappedKey,
      publicKey: keys.publicKey,
      exist: true
    });
  }

  async function clearAccount() {
    db.accounts.delete(1);
    setAccount({});
  }

  return { account, createAccount, clearAccount };
};

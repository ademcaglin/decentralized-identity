import React, { useState, useEffect } from "react";
import { createKeys, wrapCryptoKey } from "./cryptoUtils";
import Dexie from "dexie";
import { isEmptyOrNull, str2ab, ab2str } from "./baseUtils";
const db = new Dexie("AccountDB");
db.version(1).stores({
  accounts: "id"
});

export default () => {
  const [account, setAccount] = useState({});

  useEffect(() => {
    async function init() {
      const item = await db.accounts.get(1);
      if (!isEmptyOrNull(item)) {
        setAccount(item);
      }
    }
    init();
  }, [setAccount]);

  async function createAccount(password) {
    let keys = await createKeys();
    let pwdHash = await crypto.subtle.digest("SHA-256", str2ab(password));
    let wrappedKey = await wrapCryptoKey(keys.privateKey, ab2str(pwdHash));
    let item = {
      wrappedKey: wrappedKey,
      publicKey: keys.publicKey,
      exist: true
    };
    setAccount(item);
    db.accounts.add({
      id: 1,
      ...item
    });
  }

  async function removeAccount() {
    setAccount({});
    db.accounts.delete(1);
  }

  return { account, createAccount, removeAccount };
};

/*let publicKey = ab2base64(
      await window.crypto.subtle.exportKey("spki", keys.publicKey)
    );*/

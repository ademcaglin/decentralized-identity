import React, { useContext, useState } from "react";
import { AppContext } from "../stores/appStore";
import {
  createAccount,
  getPublicKey,
  sign,
  createJwt
} from "../core/accountManager";
import { ab2base64 } from "../core/baseUtils";

export default () => {
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");
  const [token, setToken] = useState("");
  const { store: appStore, dispatch: appDispatch } = useContext(AppContext);
  async function createOnClick() {
    let keys = await createAccount("aa", "bb", { id: "1" }, "test");
    if (keys) {
      let pKey = await getPublicKey();
      setPublicKey(ab2base64(pKey));
      let s = await sign(JSON.stringify({ a: "dfd" }), "test");
      setSignature(ab2base64(s));
      let t = await createJwt(JSON.stringify({ a: "dfd" }), "test");
      setToken(t);
      appDispatch({ type: "createAccount" });
    }
  }
  return (
    <div>
      {appStore.hasAccount.toString()}
      <br />
      {publicKey.toString()}
      <br />
      {signature.toString()}
      <br />
      {token.toString()}
      <br />
      <button onClick={createOnClick}>Create</button>
    </div>
  );
};

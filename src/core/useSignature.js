import { useContext } from "react";
import { AppContext, SessionContext } from "../store";
import { unwrapCryptoKey, signWithKey } from "./cryptoUtils";

export default () => {
  const { account } = useContext(AppContext);
  const { session } = useContext(SessionContext);
  async function sign(data) {
    let key = await unwrapCryptoKey(account.wrappedKey, session.pwdHash);
    let signature = await signWithKey(key, data);
    return signature;
  }
  return { sign };
};

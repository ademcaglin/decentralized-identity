import React from "react";
import useSignature from "./useSignature";
import { ab2base64 } from "./baseUtils";
import useAccount from "./useAccount";

export default () => {
  const { sign } = useSignature();
  const { account } = useAccount();
  async function getJwt(payload) {
    const header = {
      alg: "RS256",
      typ: "JWT"
    };
    let publicKey = ab2base64(
      await window.crypto.subtle.exportKey("spki", account.publicKey)
    );
    let payloadStr = JSON.stringify({ public_key: publicKey, ...payload });
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(payloadStr);
    const unsignedToken = encodedHeader + "." + encodedPayload;
    const signature = await sign(unsignedToken);
    return encodedHeader + "." + encodedPayload + "." + ab2base64(signature);
  }
  return { getJwt };
};

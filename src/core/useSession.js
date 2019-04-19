import React, { useContext } from "react";
import { str2ab, ab2str, isEmptyOrNull } from "./baseUtils";
import { useSessionStorage } from "./useSessionStorage";
import useInterval from "./useInterval";
import { AppContext } from "../store";

export default () => {
  const [session, setSession] = useSessionStorage("session", {});
  const { account } = useContext(AppContext);
  useInterval(() => {
    if (!isEmptyOrNull(session)) {
      if (new Date(session.creationDate + 10 * 1000) < new Date().getTime()) {
        setSession({});
      }
    }
  }, 5000);

  async function createSession(password) {
    let pwdHash = await crypto.subtle.digest("SHA-256", str2ab(password));
    let creationDate = new Date().getTime();
    setSession({ pwdHash: ab2str(pwdHash), creationDate });
  }

  async function removeSession() {
    setSession({});
  }

  return { session, createSession, removeSession };
};

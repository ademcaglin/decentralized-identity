import React, { useContext } from "react";
import { AppContext, SessionContext } from "../store";
import Login from "./Login";
import Register from "./Register";
import { isEmptyOrNull } from "../core/baseUtils";
import useSession from "../core/useSession";

export default props => {
  const { account } = useContext(AppContext);
  const { session, createSession, removeSession } = useSession();
  if (isEmptyOrNull(account)) {
    return <Register />;
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        createSession,
        removeSession
      }}
    >
      {isEmptyOrNull(session) ? <Login /> : props.children}
    </SessionContext.Provider>
  );
};

import React, { useContext } from "react";
import { AppContext } from "../store";
import Login from "./Login";
import Register from "./Register";
import useAccount from "../core/useAccount";

export default props => {
  const { account } = useContext(AppContext);
  if (account && account.exist) {
    return <div>{props.children}</div>;
  }
  /*if (store.pwdHash) {
    return <Login />;
  }*/ return <Register />;
};

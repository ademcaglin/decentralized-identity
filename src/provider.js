import React, { useReducer } from "react";
import { AppContext, initialState, reducer } from "./store";
import useAccount from "./core/useAccount";

export default props => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const { account, removeAccount, createAccount } = useAccount();

  return (
    <AppContext.Provider
      value={{
        store,
        dispatch,
        account,
        createAccount,
        removeAccount
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

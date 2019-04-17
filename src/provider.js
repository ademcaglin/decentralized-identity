import React, { useReducer } from "react";
import { AppContext, initialState, reducer } from "./store";
import useAccount from "./core/useAccount";

export default props => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const { account, clearAccount, createAccount } = useAccount();
  /*useEffect(() => {
    if (store.elapsedSecond > 5) {
      dispatch({ type: "CLEAR_PWDHASH" });
      //props.history.push(`/account`);
    }
    let timer = setTimeout(
      () => dispatch({ type: "INCREMENT_ELAPSEDSECOND" }),
      5000
    );
    return () => {
      clearTimeout(timer);
    };
  }, [store.elapsedSecond]);

  useEffect(() => {}, []);*/

  return (
    <AppContext.Provider
      value={{ store, dispatch, account, createAccount, clearAccount }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

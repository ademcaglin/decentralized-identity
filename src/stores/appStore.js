import React from "react";

export const initialState = {
  hasAccount: false,
  isRegistered: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "createAccount":
      return { ...initialState, hasAccount: true };
    case "register":
      return { ...initialState, isRegistered: true };
    default:
      return state;
  }
};

export const AppContext = React.createContext();

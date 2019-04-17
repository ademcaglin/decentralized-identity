import React from "react";

export const initialState = {
  hasAccount: false,
  timeCounter: 0
};

export const AppContext = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "CREATE_ACCOUNT":
      return { ...state, hasAccount: true };
    case "CREATE_SESSION":
      return {
        ...state,
        timeCounter: 0
      };
    case "INCREMENT_COUNTER":
      return {
        ...state,
        timeCounter: state.timeCounter + 1
      };
    case "CLEAR_SESSION":
      return { ...state, timeCounter: 0 };
    default:
      return state;
  }
};

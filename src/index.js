import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./styles.css";
import { AppContext, initialState, reducer } from "./stores/appStore";
import Home from "./components/Home";

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

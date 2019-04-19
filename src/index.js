import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./styles.css";
import Provider from "./provider";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Scan from "./components/Scan";

function App() {
  return (
    <Provider>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/scan" component={Scan} />
        </Switch>
      </Layout>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);

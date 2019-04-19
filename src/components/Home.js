import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { AppContext, SessionContext } from "../store";
import useJwt from "../core/useJwt";
import { parseJwt } from "../core/baseUtils";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});

export default () => {
  const classes = useStyles();
  const { account, removeAccount } = useContext(AppContext);
  const { session, removeSession } = useContext(SessionContext);
  const [token, setToken] = useState("");
  const { getJwt } = useJwt();
  async function createToken() {
    let t = await getJwt({ sdfs: "sfs" });
    console.log(parseJwt(t));
    setToken(t);
  }

  return (
    <div>
      {JSON.stringify(account)}
      <br />
      {JSON.stringify(session)}
      <br />
      {token}
      <br />
      <Button className={classes.root} onClick={() => removeAccount()}>
        Reset
      </Button>
      <br />
      <br />
      <Button className={classes.root} onClick={() => removeSession()}>
        Remove Session
      </Button>
      <br />
      <br />
      <Button className={classes.root} onClick={() => createToken()}>
        Create Token
      </Button>
      <br />
      <br />
      <Button className={classes.root} component={Link} to="/scan">
        Scan
      </Button>
    </div>
  );
};

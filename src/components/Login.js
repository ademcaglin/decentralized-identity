import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { AppContext, SessionContext } from "../store";

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
  const { account } = useContext(AppContext);
  const { createSession } = useContext(SessionContext);
  return (
    <div>
      {JSON.stringify(account)}
      <br />
      <Button className={classes.root} onClick={() => createSession("aaa")}>
        Create Session
      </Button>
    </div>
  );
};

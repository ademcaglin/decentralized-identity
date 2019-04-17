import React, { useContext, useState } from "react";
import { AppContext } from "../store";
import {
  createAccount,
  getPublicKey,
  sign,
  createJwt
} from "../core/accountManager";
import { ab2base64 } from "../core/baseUtils";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import useAccount from "../core/useAccount";

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
  const { createAccount } = useContext(AppContext);
  return (
    <div>
      <Button className={classes.root} onClick={() => createAccount("pwd")}>
        Create
      </Button>
    </div>
  );
  /*const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");
  const [token, setToken] = useState("");
  const { store, dispatch } = useContext(AppContext);
  async function createOnClick() {
    let keys = await createAccount("test");
    if (keys) {
      let pKey = await getPublicKey();
      setPublicKey(ab2base64(pKey));
      let s = await sign(JSON.stringify({ a: "dfd" }), "test");
      setSignature(ab2base64(s));
      let t = await createJwt(JSON.stringify({ a: "dfd" }), "test");
      setToken(t);
      dispatch({ type: "CREATE_ACCOUNT" });
    }
  }

  return (
    <div>
      {store.hasAccount.toString()}
      <br />
      {publicKey.toString()}
      <br />
      {signature.toString()}
      <br />
      elapsed time: {store.elapsedSecond}
      <br />
      {token.toString()}
      <br />
      <Button className={classes.root} onClick={createOnClick}>
        Create
      </Button>
    </div>
  );*/
};

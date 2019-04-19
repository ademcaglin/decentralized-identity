import React, { useState } from "react";
import QrReader from "react-qr-reader";
export default () => {
  async function handleScan(data) {
    if (data) {
      // parse qr code
      // login(info) | sign
    }
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <QrReader
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={{ width: "100%" }}
    />
  );
};

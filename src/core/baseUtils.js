function ab2base64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base642ab(base64Str) {
  return Uint8Array.from(atob(base64Str), c => c.charCodeAt(0));
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function buffer2hex(buffer) {
  let str = Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
  return "0x" + str;
}

export { ab2base64, base642ab, buffer2hex, ab2str, str2ab };

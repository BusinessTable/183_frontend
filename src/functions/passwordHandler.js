import axios from "axios";
import Cookies from "js-cookie";
var AES = require("crypto-js/aes");

let url = "http://localhost:5005";

// register as new user
export async function register(username, password) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url + "/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ username: username, masterPassword: password }),
  };

  return await axios.request(config);
}

// login function
export async function login(username, password) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url + "/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ username: username, masterPassword: password }),
  };

  return await axios.request(config);
}

// get all passwords
export async function getPasswords(token) {
  console.log(Cookies.get("MP").split(":")[1]);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({ username: Cookies.get("MP").split(":")[1] }),
  };

  let passwords = await axios.request(config);

  // decrypt passwords
  passwords = passwords.data.map((password) => {
    return AES.decrypt(password, Cookies.get("MP").split(":")[0]);
  });

  return passwords;
}

// add new password
export async function addPassword(token, password) {
  // encrypt passwords
  let [MP, userName] = Cookies.get("MP").split(":")
  password = AES.encrypt(password, MP);

  console.log(password);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url + "/passwords/add",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: {
      username: userName,
      passwords: password,
    },
  };

  return await axios.request(config);
}

// delete password
export async function deletePassword(token, uuid) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({
      username: Cookies.get("MP").split(":")[1],
      uuid: uuid,
    }),
  };

  return await axios.request(config);
}

// update password
export async function updatePassword(token, uuid, password) {
  // encrypt password
  password = AES.encrypt(password, Cookies.get("MP")).toString();

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({
      username: Cookies.get("MP").split(":")[1],
      uuid: uuid,
      newPassword: password,
    }),
  };

  return await axios.request(config);
}

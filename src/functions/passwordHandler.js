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
export async function getPasswords(token, username) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({ username: username }),
  };

  let passwords = await axios.request(config);

  // decrypt passwords
  passwords = passwords.data.map((password) => {
    return AES.decrypt(password, Cookies.get("MP")).toString();
  });

  return passwords;
}

// add new password
export async function addPassword(token, username, passwords) {
  // encrypt passwords
  passwords = passwords.map((password) => {
    return AES.encrypt(password, Cookies.get("MP")).toString();
  });

  console.log(passwords);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({ username: username, passwords: passwords }),
  };

  return await axios.request(config);
}

// delete password
export async function deletePassword(token, username, uuid) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({ username: username, uuid: uuid }),
  };

  return await axios.request(config);
}

// update password
export async function updatePassword(token, username, uuid, password) {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({
      username: username,
      uuid: uuid,
      newPassword: password,
    }),
  };

  return await axios.request(config);
}

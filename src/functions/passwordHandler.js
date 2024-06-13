import axios from "axios";
import CryptoJS from "crypto-js";

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
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return await axios
    .request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      return error;
    });
}

// add new password
export async function addPassword(token, username, password) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url + "/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({ username: username, password: password }),
  };

  return await axios
    .request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      return error;
    });
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

  return await axios
    .request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      return error;
    });
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

  return await axios
    .request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      return error;
    });
}

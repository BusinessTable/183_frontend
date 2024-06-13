import axios from 'axios';
import CryptoJS from 'crypto-js';

let url = 'http://localhost:5005';

export async function register(username, password) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url + '/register',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ username: username, masterPassword: password }),
  };

  return await axios.request(config);
}

export async function login(username, password) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url + '/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ username: username, masterPassword: password }),
  };

  return await axios.request(config);
}

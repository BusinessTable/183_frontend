import axios from 'axios';
import Cookies from 'js-cookie';
var CryptoJS = require('crypto-js');

let url = 'http://localhost:5005';

// register as new user
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

// login function
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

// get a Page of passwords
export async function getPasswordsPage(token, page) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url + '/passwords',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data: JSON.stringify({
      username: Cookies.get('MP').split(':')[1],
      page: page,
    }),
  };

  let passwords = await axios.request(config);

  // Decrypt
  let originalText = [];
  passwords.data.passwords.forEach((password) => {
    originalText.push({
      password: JSON.parse(
        CryptoJS.AES.decrypt(
          password.data,
          Cookies.get('MP').split(':')[0]
        ).toString(CryptoJS.enc.Utf8)
      ),
      uuid: password.uuid,
    });
  });
  return { totalPages: passwords.data.totalPages, passwords: originalText };
}

// get all passwords
export async function getAllPasswords(token) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url + '/passwords',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data: JSON.stringify({
      username: Cookies.get('MP').split(':')[1],
      page: 0,
    }),
  };

  let passwords = await axios.request(config);

  // Decrypt
  let originalText = [];
  passwords.data.forEach((password) => {
    originalText.push({
      password: JSON.parse(
        CryptoJS.AES.decrypt(
          password.data,
          Cookies.get('MP').split(':')[0]
        ).toString(CryptoJS.enc.Utf8)
      ),
      uuid: password.uuid,
    });
  });
  return originalText;
}

// add new password
export async function addPassword(token, password) {
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    Cookies.get('MP').split(':')[0].toString()
  ).toString();

  let username = Cookies.get('MP').split(':')[1];

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url + '/passwords/add',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data: {
      username: username,
      passwords: ciphertext,
    },
  };

  const response = await axios.request(config);
  return response.data;
}

// delete password
export async function deletePassword(token, uuid) {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: url + '/passwords',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data: JSON.stringify({
      username: Cookies.get('MP').split(':')[1],
      uuid: uuid,
    }),
  };

  return await axios.request(config);
}

// update password
export async function updatePassword(token, uuid, password) {
  // encrypt password
  password = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    Cookies.get('MP').split(':')[0].toString()
  ).toString();

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: url + '/passwords',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data: JSON.stringify({
      username: Cookies.get('MP').split(':')[1],
      uuid: uuid,
      newPassword: password,
    }),
  };

  return await axios.request(config);
}

// Function to fetch rubriks for a user
export async function getRubriks(token) {
  try {
    const response = await axios.post(
      url + '/rubriken',
      { username: getUsernameFromToken(token) },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching rubriks:', error);
    throw error;
  }
}

// Function to create a new rubrik
export async function createRubrik(token, rubrik) {
  try {
    const response = await axios.post(
      url + '/rubriken/create',
      {
        username: getUsernameFromToken(token),
        rubrik: rubrik,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating rubrik:', error);
    throw error;
  }
}

// Function to delete a rubrik
export async function deleteRubrik(token, uuid) {
  try {
    const response = await axios.delete(url + '/rubriken', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: {
        username: getUsernameFromToken(token),
        uuid: uuid,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting rubrik:', error);
    throw error;
  }
}

// Function to update a rubrik
export async function updateRubrik(token, uuid, newRubrik) {
  try {
    const response = await axios.put(
      url + '/rubriken',
      {
        username: getUsernameFromToken(token),
        uuid: uuid,
        newRubrik: newRubrik,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating rubrik:', error);
    throw error;
  }
}

// Function to add a password to a rubrik
export async function addPasswordToRubrik(token, rubrikUUID, passwordUUID) {
  try {
    const response = await axios.post(
      url + '/rubriken/passwords',
      {
        username: getUsernameFromToken(token),
        uuid: rubrikUUID,
        passwordUUID: passwordUUID,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding password to rubrik:', error);
    throw error;
  }
}

// Function to remove a password from a rubrik
export async function removePasswordFromRubrik(
  token,
  rubrikUUID,
  passwordUUID
) {
  try {
    const response = await axios.delete(url + '/rubriken/passwords', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: {
        username: getUsernameFromToken(token),
        uuid: rubrikUUID,
        passwordUUID: passwordUUID,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing password from rubrik:', error);
    throw error;
  }
}

// Utility function to extract username from token
function getUsernameFromToken(token) {
  return Cookies.get('MP').split(':')[1]; // Replace with your cookie handling logic
}

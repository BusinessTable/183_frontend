import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const baseURL = 'http://localhost:5005';
const config = {
  maxBodyLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
  },
};

const getAuthConfig = (token) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  },
});

const getUserData = () => {
  const [encryptionKey, username] = Cookies.get('MP').split(':');
  return { encryptionKey, username };
};

const encryptPassword = (password, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(password), key).toString();
};

const decryptPassword = (password, key) => {
  return JSON.parse(
    CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8)
  );
};

const prepareData = (data) => JSON.stringify(data);

export const register = async (username, password) => {
  return await axios.post(`${baseURL}/register`, prepareData({ username, masterPassword: password }), config);
};

export const login = async (username, password) => {
  return await axios.post(`${baseURL}/login`, prepareData({ username, masterPassword: password }), config);
};

export const getPasswordsPage = async (token, page) => {
  const { encryptionKey, username } = getUserData();
  const response = await axios.post(`${baseURL}/passwords`, prepareData({ username, page }), getAuthConfig(token));
  const passwords = response.data.passwords.map((password) => ({
    password: decryptPassword(password.data, encryptionKey),
    uuid: password.uuid,
  }));
  return { totalPages: response.data.totalPages, passwords };
};

export const getAllPasswords = async (token) => {
  const { encryptionKey, username } = getUserData();
  const response = await axios.post(`${baseURL}/passwords`, prepareData({ username, page: 0 }), getAuthConfig(token));
  return response.data.map((password) => ({
    password: decryptPassword(password.data, encryptionKey),
    uuid: password.uuid,
  }));
};

export const addPassword = async (token, password) => {
  const { encryptionKey, username } = getUserData();
  const encryptedPassword = encryptPassword(password, encryptionKey);
  const response = await axios.post(`${baseURL}/passwords/add`, { username, passwords: encryptedPassword }, getAuthConfig(token));
  return response.data;
};

export const deletePassword = async (token, uuid) => {
  const { username } = getUserData();
  return await axios.delete(`${baseURL}/passwords`, {
    ...getAuthConfig(token),
    data: prepareData({ username, uuid }),
  });
};

export const updatePassword = async (token, uuid, password) => {
  const { encryptionKey, username } = getUserData();
  const encryptedPassword = encryptPassword(password, encryptionKey);
  return await axios.put(`${baseURL}/passwords`, prepareData({ username, uuid, newPassword: encryptedPassword }), getAuthConfig(token));
};

export const getRubriks = async (token) => {
  const { username } = getUserData();
  try {
    const response = await axios.post(`${baseURL}/rubriken`, prepareData({ username }), getAuthConfig(token));
    return response.data;
  } catch (error) {
    console.error('Error fetching rubriks:', error);
    throw error;
  }
};

export const createRubrik = async (token, rubrik) => {
  const { username } = getUserData();
  try {
    const response = await axios.post(`${baseURL}/rubriken/create`, prepareData({ username, rubrik }), getAuthConfig(token));
    return response.data;
  } catch (error) {
    console.error('Error creating rubrik:', error);
    throw error;
  }
};

export const deleteRubrik = async (token, uuid) => {
  const { username } = getUserData();
  try {
    const response = await axios.delete(`${baseURL}/rubriken`, {
      ...getAuthConfig(token),
      data: prepareData({ username, uuid }),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting rubrik:', error);
    throw error;
  }
};

export const updateRubrik = async (token, uuid, newRubrik) => {
  const { username } = getUserData();
  try {
    const response = await axios.put(`${baseURL}/rubriken`, prepareData({ username, uuid, newRubrik }), getAuthConfig(token));
    return response.data;
  } catch (error) {
    console.error('Error updating rubrik:', error);
    throw error;
  }
};

export const addPasswordToRubrik = async (token, rubrikUUID, passwordUUID) => {
  const { username } = getUserData();
  try {
    const response = await axios.post(`${baseURL}/rubriken/passwords`, prepareData({ username, uuid: rubrikUUID, passwordUUID }), getAuthConfig(token));
    return response.data;
  } catch (error) {
    console.error('Error adding password to rubrik:', error);
    throw error;
  }
};

export const removePasswordFromRubrik = async (token, rubrikUUID, passwordUUID) => {
  const { username } = getUserData();
  try {
    const response = await axios.delete(`${baseURL}/rubriken/passwords`, {
      ...getAuthConfig(token),
      data: prepareData({ username, uuid: rubrikUUID, passwordUUID }),
    });
    return response.data;
  } catch (error) {
    console.error('Error removing password from rubrik:', error);
    throw error;
  }
};

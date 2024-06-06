import axios from "axios";

export async function register(username, password) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://139.162.128.79:5005/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ username: username, masterPassword: password }),
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

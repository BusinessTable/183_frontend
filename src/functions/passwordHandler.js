import axios from "axios";

export async function register(username, password) {
  let config = {
    method: "post",
    url: "https://139.162.128.79:5005/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({username:username, masterPassword:password }),
  };

  await axios
    .request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      return error;
    });
}

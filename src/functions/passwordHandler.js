import axios from "axios";
const auth = '{"username":"admin"}';

export function get() {
  let config = {
    method: "get",
    url: "https://139.162.128.79:5005/passwords",
    headers: {
      "Content-Type": "application/json",
    },
    data: auth,
  };

  axios
    .request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      return error;
    });
}

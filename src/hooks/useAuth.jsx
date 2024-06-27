import * as React from "react";
import Cookies from "js-cookie";

// Create context
const authContext = React.createContext();

// Custom hook to use auth
function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    // Check if the token cookie exists when the component mounts
    const token = Cookies.get("token");
    if (token) {
      setAuthed(token);
    }
  }, []);

  return {
    authed,
    login({ token, expiresIn, MP, username }) {
      return new Promise((res) => {
        const expires = new Date(expiresIn);
        Cookies.set("token", token, { expires }); // Set the token cookie with expiration date
        Cookies.set("MP", MP + ":" + username, { expires }); // Set the MP cookie with expiration date
        setAuthed(token);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        Cookies.remove("token"); // Remove the token cookie
        Cookies.remove("MP"); // Remove the MP cookie
        setAuthed(false);
        res();
      });
    },
  };
}

// AuthProvider component
export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// AuthConsumer component
export default function AuthConsumer() {
  return React.useContext(authContext);
}

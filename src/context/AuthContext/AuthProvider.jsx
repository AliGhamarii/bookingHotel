import { useReducer } from "react";
import AuthContext from "./AuthContext";

const initialStateReducer = { user: null, isAuthenticated: false };

const fake_user = {
  email: "shadow@gmail.com",
  password: "1234",
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return {
        isAuthenticated: false,
        user: null,
      };
      default: throw new Error("Unknown action!")
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialStateReducer
  );

  function login(email, password) {
    if (email === fake_user.email && password === fake_user.password) {
      dispatch({ type: "login", payload: fake_user });
    }
  }

  function logout(email, password) {
    if (email === fake_user.email && password === fake_user.password) {
      dispatch({ type: "logout" });
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

import React, { useState } from "react";
import { loginService } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";
import Form from "../../components/Form";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { checkAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!username) {
        setError("Username is required.");
        return;
      } else if (!password) {
        setError("Password is required.");
        return;
      }

      const loginUser = await loginService({ username, password });
      if (loginUser.status == 200) {
        checkAuth();
        console.log("User logged in!");
      } else {
        setError(loginUser.response.data.message);
      }
    } catch (error) {
      console.error("Error when trying to login", error);
    }
  };

  return (
    <Form
      style="w-80 bg-sky-200 rounded-3xl p-4 border-2 border-sky-500"
      title={{
        title: "Login",
        style: "text-center font-bold text-2xl pb-4 tracking-wider",
      }}
      fields={[
        {
          label: "Username",
          labelStyle: "inline-block pb-1",
          style: "w-full p-1 rounded-md",
          value: username,
          onChange: (e) => setUsername(e.target.value),
          type: "text",
        },
        {
          label: "Password",
          labelStyle: "inline-block pb-1",
          style: "w-full p-1 rounded-md",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          type: "password",
          autocomplete: "no",
        },
      ]}
      onSubmit={handleLogin}
      error={error}
      buttons={[
        {
          text: "Login",
          style: "px-5 py-1 bg-sky-400 rounded-xl",
          type: "submit",
        },
        {
          text: "Sign Up",
          style: "px-5 py-1 bg-sky-400 rounded-xl",
        },
      ]}
      demoButton={{
        style: "px-6 py-1 bg-sky-600 rounded-3xl block mx-auto my-1",
        text: "Try demo",
      }}
    />
  );
};

export default Login;

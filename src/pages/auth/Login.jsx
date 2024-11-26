import React, { useState } from "react";
import { loginService } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";
import Form from "../../components/Form";
import { createDemo } from "./createDemo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { checkAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Username is required.");
      return;
    } else if (!password) {
      setError("Password is required.");
      return;
    }

    try {
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

  const handleDemo = () => {
    createDemo({checkAuth});
  };

  return (
    <Form
      style="w-80 bg-sky-200 rounded-3xl p-4 border-2 border-sky-500"
      title={{
        title: "Login",
        style: "text-center font-bold text-2xl pb-4 tracking-wider",
      }}
      onSubmit={handleLogin}
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
      error={error}
      button={{
        text: "Login",
        style: "px-5 py-1 bg-sky-400 rounded-xl",
        type: "submit",
      }}
      navigationAnchor={{
        text: "Sign up",
        href: "/signup",
        style: "px-5 py-1 bg-sky-400 rounded-xl",
      }}
      demoButton={{
        style: "px-6 py-1 bg-sky-600 rounded-3xl block mx-auto my-1",
        text: "Try demo",
        type: "button",
        onClick: handleDemo,
      }}
    />
  );
};

export default Login;

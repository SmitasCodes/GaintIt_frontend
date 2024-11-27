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
    createDemo({ checkAuth });
  };

  return (
    <Form
      style="w-80 bg-neutral rounded-2xl p-4 border-2 border-secondary shadow-lg"
      title={{
        title: "Login",
        style:
          "text-center font-bold text-2xl pb-4 tracking-wider text-transparent    bg-clip-text bg-gradient-to-r from-accent from-30% to-secondary",
      }}
      onSubmit={handleLogin}
      fields={[
        {
          label: "Username",
          labelStyle: "inline-block pb-1 text-accent ",
          style:
            "w-full p-1 rounded-md border border-secondary focus:outline-none focus:ring-1 focus:ring-accent",
          value: username,
          onChange: (e) => setUsername(e.target.value),
          type: "text",
        },
        {
          label: "Password",
          labelStyle: "inline-block text-accent pb-1",
          style:
            "w-full p-1 rounded-md  border border-secondary focus:outline-none focus:ring-1 focus:ring-accent",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          type: "password",
          autocomplete: "no",
        },
      ]}
      error={error}
      button={{
        text: "Login",
        style: "px-5 py-1 bg-primary text-neutral rounded-xl",
        type: "submit",
      }}
      navigationAnchor={{
        text: "Sign up",
        href: "/signup",
        style: "px-5 py-1 bg-secondary text-neutral rounded-xl",
      }}
      demoButton={{
        style: "px-6 py-1 bg-accent text-neutral rounded-3xl block mx-auto my-1",
        text: "Try demo",
        type: "button",
        onClick: handleDemo,
      }}
    />
  );
};

export default Login;

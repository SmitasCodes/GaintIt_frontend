import React, { useState } from "react";
import Form from "../../components/Form";
import { useAuth } from "../../context/AuthContext";
import { signupService } from "../../services/authServices";
import { createDemo } from "./createDemo";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { checkAuth } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    const collection = "users";

    if (!email) {
      setError("Email is required.");
      return;
    } else if (!username) {
      setError("Username is required.");
      return;
    } else if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      const signupUser = await signupService({
        email,
        username,
        password,
        collection,
      });
      if (signupUser.status == 201) {
        checkAuth();
        console.log("User signed up!");
      } else {
        setError(signupUser.response.data.message);
      }
    } catch (error) {
      console.error("Error when trying to sign up", error);
    }
  };

  const handleDemo = () => {
    createDemo({ checkAuth });
  };

  return (
    <Form
      style="w-80 bg-neutral rounded-2xl p-4 border-2 border-secondary shadow-lg"
      title={{
        title: "Sign up",
        style:
          "text-center font-bold text-2xl pb-4 tracking-wider text-transparent    bg-clip-text bg-gradient-to-r from-accent from-30% to-secondary",
      }}
      fields={[
        {
          label: "Email",
          labelStyle: "inline-block pb-1 text-accent",
          style: "w-full p-1 rounded-md border border-secondary focus:outline-none focus:ring-1 focus:ring-accent",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          type: "email",
        },
        {
          label: "Username",
          labelStyle: "inline-block pb-1 text-accent",
          style: "w-full p-1 rounded-md border border-secondary focus:outline-none focus:ring-1 focus:ring-accent",
          value: username,
          onChange: (e) => setUsername(e.target.value),
          type: "text",
        },
        {
          label: "Password",
          labelStyle: "inline-block pb-1 text-accent",
          style: "w-full p-1 rounded-md border border-secondary focus:outline-none focus:ring-1 focus:ring-accent",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          type: "password",
          autocomplete: "no",
        },
      ]}
      onSubmit={handleSignup}
      error={error}
      button={{
        text: "Sign up",
        style: "px-5 py-1 bg-sky-400 rounded-xl bg-primary text-neutral",
        type: "submit",
      }}
      navigationAnchor={{
        text: "Login",
        href: "/login",
        style: "px-5 py-1 rounded-xl bg-secondary text-neutral",
      }}
      demoButton={{
        style: "px-6 py-1  bg-accent text-neutral rounded-3xl block mx-auto my-1",
        text: "Try demo",
        type: "button",
        onClick: handleDemo,
      }}
    />
  );
};

export default Signup;

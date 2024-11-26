import React, { useState } from "react";
import Form from "../../components/Form";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefaaualt();
  };

  return (
    <Form
      style="w-80 bg-sky-200 rounded-3xl p-4 border-2 border-sky-500"
      title={{
        title: "Sign up",
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
      onSubmit={handleSignup}
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

export default Signup;

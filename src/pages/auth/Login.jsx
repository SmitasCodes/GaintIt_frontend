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
    <div className="w-80 bg-sky-200 rounded-3xl p-4 border-2 border-sky-500">
      <h2 className="text-center font-bold text-2xl pb-4 tracking-wider">
        Login
      </h2>
      {/* <form onSubmit={handleLogin}>
        {<p className="text-red-600">{error}</p>}

        <div className="flex justify-around mt-2">
          <button className="px-5 py-1 bg-sky-400 rounded-xl" type="submit">
            Login
          </button>
          <button className="px-5 py-1 bg-sky-400 rounded-xl">Sign Up</button>
        </div>

        <div className="flex items-center my-2">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="px-4 text-gray-800 text-sm">or</span>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>

        <button className="px-6 py-1 bg-sky-600 rounded-3xl block mx-auto my-1">
          Try demo
        </button>
      </form> */}
      <Form
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
      />
    </div>
  );
};

export default Login;

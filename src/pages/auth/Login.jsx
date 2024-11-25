import React, { useState } from "react";
import { loginService } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [username, setInput] = useState("");
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
      <form onSubmit={handleLogin}>
        <div className="pb-2">
          <label className="inline-block pb-1">Username</label>
          <input
            className="w-full p-1 rounded-md"
            value={username}
            required
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="pb-2">
          <label className="inline-block pb-1">Password</label>
          <input
            className="w-full p-1 rounded-md border-2"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {<p className="text-red-600">{error}</p>}

        <div className="flex justify-around mt-2">
          <button
            className="px-5 py-1 bg-sky-400 rounded-xl"
            onClick={handleLogin}
            type="submit"
          >
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
      </form>
    </div>
  );
};

export default Login;

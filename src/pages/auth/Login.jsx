import React from "react";

const Login = () => {
  return (
    <div className="w-96 h-96 bg-sky-200 rounded-3xl p-4">
      <h2 className="text-center font-bold text-3xl pb-4">Login</h2>
      <form>
        <div className="">
          <label>Username</label>
          <input className="w-full"/>
        </div>
        <div className="">
          <label>Password</label>
          <input className="w-full" />
        </div>

        <button>Login</button>
        <button>Sign Up</button>
        <button>Try demo</button>
      </form>
    </div>
  );
};

export default Login;

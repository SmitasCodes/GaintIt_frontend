import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { username, checkAuth } = useAuth();

  const logOut = () => {
    localStorage.removeItem("user");
    checkAuth();
  };

  return (
    <div className="h-[50%] w-[50%] border-2 border-accent rounded-xl">
      <h2 className="text-center py-2 text-xl tracking-wide">Profile</h2>
      <ul className="p-4">
        <li>{`Username: ${username}`}</li>
        <li>{`Workout records: 55`}</li>
        <button onClick={logOut} className="bg-primary py-1 px-4 rounded-3xl">Log out</button>
      </ul>
    </div>
  );
};

export default Profile;

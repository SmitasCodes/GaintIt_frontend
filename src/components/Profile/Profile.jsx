import React from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button";

const Profile = () => {
  const { username, logout } = useAuth();

  return (
    <div className="h-[40%] w-[50%] border-2 border-accent rounded-xl">
      <h2 className="text-center py-2 text-xl tracking-wide">Profile</h2>
      <ul className="p-4">
        <li>{`Username: ${username}`}</li>
        {/* Hard coded count */}
        <li>{`Workout records: 55`}</li>
        <Button
          style="bg-primary py-1 px-4 rounded-3xl"
          onClick={logout}
          text="Log out"
        />
      </ul>
    </div>
  );
};

export default Profile;

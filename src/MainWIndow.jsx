import React from "react";
import Profile from "./components/Profile/Profile";
import WorkoutTemplates from "./components/Templates/WorkoutTemplates"
import Records from "./components/Records/Records";

const MainWIndow = () => {
  return (
    <div className="w-[1150px] h-screen flex flex-col flex-wrap gap-2 p-2" >
      <Profile />
      <WorkoutTemplates/>
      <Records/>
    </div>
  );
};

export default MainWIndow;

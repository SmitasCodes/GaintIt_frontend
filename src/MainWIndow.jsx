import React from "react";
import User from "./components/User/User";
import WorkoutTemplates from "./components/Templates/WorkoutTemplates"
import Records from "./components/Records/Records";

const MainWIndow = () => {
  return (
    <div className="w-[1150px] h-screen flex flex-col flex-wrap gap-2 p-2" >
      <User />
      <WorkoutTemplates/>
      <Records/>

    </div>
  );
};

export default MainWIndow;

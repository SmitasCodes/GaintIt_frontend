import React from "react";

const TemplateExercises = ({ exercises }) => {
    console.log(exercises)
  return (
    <ul>
      {exercises.map((exercise)=>{
        return <li>{exercise["exercise-name"]}</li>
      })}
    </ul>
  );
};

export default TemplateExercises;

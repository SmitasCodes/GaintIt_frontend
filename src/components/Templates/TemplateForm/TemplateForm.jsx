import React, { useEffect, useRef, useState } from "react";
import TemplatesSectionWrapper from "../TemplatesSectionWrapper";
import TemplateSubmitButton from "../TemplateSubmitButton";
import AddExerciseInput from "./AddExerciseInput";

const TemplateForm = () => {
  const [exercises, setExercises] = useState({ exercises: [] });
  const [templateReqBody, setTemplateReqBody] = useState("");

  useEffect(() => {}, []);

  const getExerciseInput = (exerciseInput) => {
    // setExercises({
    //   // ...exercises,
    //   exercises: [{ "exercise-name": exerciseInput }],
    // });
    // console.log(exercises);

    const newExercise = { "exercise-name": exerciseInput };
    setExercises((prevExercises) => [...prevExercises, newExercise]);
  };

  return (
    <TemplatesSectionWrapper>
      <form className="bg-red-900 px-2 relative ">
        <div className="flex justify-between py-3">
          <label className="pr-3">Template name:</label>
          <input type="text" className="flex-grow" />
        </div>
        <AddExerciseInput getInput={getExerciseInput} />
      </form>
      <TemplateSubmitButton buttonText={"Submit Template"} />
    </TemplatesSectionWrapper>
  );
};

export default TemplateForm;

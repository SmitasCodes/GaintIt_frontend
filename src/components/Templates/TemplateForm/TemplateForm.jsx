import React, { useEffect, useRef, useState } from "react";
import TemplatesSectionWrapper from "../TemplatesSectionWrapper";
import TemplateSubmitButton from "../TemplateSubmitButton";
import AddExerciseInput from "./AddExerciseInput";
import TemplateExercises from "../TemplateExercises";
import { v4 as uuidv4 } from "uuid";

const TemplateForm = () => {
  const [exercises, setExercises] = useState([]);
  const [addTemplateReq, setAddTemplateReq] = useState({
    name: "",
    exercises: [],
  });
  const [templateName, setTemplateName] = useState("");

  const getExerciseInput = (exerciseInput) => {
    setExercises((prevExercises) => [
      ...prevExercises,
      { "exercise-name": exerciseInput, id: uuidv4() },
    ]);
  };

  const addTemplateButtonHandler = () => {};

  return (
    <TemplatesSectionWrapper>
      <form className="bg-red-900 px-2 relative ">
        <div className="flex justify-between py-3">
          <label className="pr-3">Template name:</label>
          <input
            type="text"
            className="flex-grow"
            onChange={(e) => setTemplateName(e.target.value)}
            value={templateName}
          />
        </div>
        <TemplateExercises exercises={exercises} setExercises={setExercises} />
        <AddExerciseInput getInput={getExerciseInput} />
      </form>
      <TemplateSubmitButton
        buttonText={"Submit Template"}
        clickFunction={addTemplateButtonHandler}
      />
    </TemplatesSectionWrapper>
  );
};

export default TemplateForm;

import React, { useEffect, useRef, useState } from "react";
import TemplatesSectionWrapper from "../TemplatesSectionWrapper";
import TemplateSubmitButton from "../TemplateSubmitButton";
import AddExerciseInput from "./AddExerciseInput";
import TemplateExercises from "../TemplateExercises";
import { v4 as uuidv4 } from "uuid";
import { postTemplateService } from "../../../services/templateServices";

const TemplateForm = () => {
  const [exercises, setExercises] = useState([]);
  const [templateName, setTemplateName] = useState("");

  const getExerciseInput = (exerciseInput) => {
    setExercises((prevExercises) => [
      ...prevExercises,
      { exercise_name: exerciseInput, id: uuidv4() },
    ]);
  };

  const addTemplateButtonHandler = async () => {
    if (!templateName) {
      console.log("Please enter template name");
      return;
    } else if (!exercises.length) {
      console.log("Please add some exercises");
      return;
    }

    // Removing id from exercises, before posting
    const transformedExercises = exercises.map((exercise) => ({
      exercise_name: exercise["exercise_name"],
    }));

    const templateData = {
      name: templateName,
      exercises: transformedExercises,
    };

    try {
      const response = await postTemplateService(templateData);
      if (response == 201) {
        console.log("Template added succesfully!S");
      }
    } catch (error) {
      console.error("Error when trying to post template");
    }

    setExercises([]);
    setTemplateName("");
  };

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

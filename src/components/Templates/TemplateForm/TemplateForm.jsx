import React, { useEffect, useState } from "react";
import TemplatesSectionWrapper from "../TemplatesSectionWrapper";
import TemplateSubmitWrapper from "../TemplateSubmitWrapper";
import AddExerciseInput from "./AddExerciseInput";
import TemplateExercises from "../TemplateExercises";
import { v4 as uuidv4 } from "uuid";
import {
  postTemplateService,
  updateTemplateService,
} from "../../../services/templateServices";
import { useAuth } from "../../../context/AuthContext";
import { useTemplates } from "../../../context/TemplateContext";

const TemplateForm = ({ editTemplate }) => {
  const [exercises, setExercises] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [templateID, setTemplateID] = useState("");
  const { token } = useAuth();
  const { fetchTemplates } = useTemplates();

  useEffect(() => {
    if (editTemplate) {
      setTemplateName(editTemplate.name);
      setExercises(editTemplate.exercises);
      setTemplateID(editTemplate._id);
    }
  }, [editTemplate]);

  const getExerciseInput = (exerciseInput) => {
    setExercises((prevExercises) => [
      ...prevExercises,
      { exercise_name: exerciseInput, _id: uuidv4() },
    ]);
  };

  const submitTemplateHandler = async () => {
    if (!templateName) {
      console.log("Please enter template name");
      return;
    } else if (!exercises.length) {
      console.log("Please add some exercises");
      return;
    }

    // Removing _id from exercises, before posting
    const transformedExercises = exercises.map((exercise) => ({
      exercise_name: exercise["exercise_name"],
    }));

    const templateData = {
      name: templateName,
      exercises: transformedExercises,
    };

    try {
      const response = !editTemplate
        ? await postTemplateService(templateData, `Bearer ${token}`)
        : await updateTemplateService(
            templateID,
            templateData,
            `Bearer ${token}`
          );

      if (
        (!editTemplate && response == 201) ||
        (editTemplate && response == 200)
      ) {
        console.log(
          `Template ${!editTemplate ? "added" : "updated"} succesfully!`
        );
      }
    } catch (error) {
      console.error(
        `Error when trying to ${!editTemplate ? "add" : "update"} template`,
        error
      );
    }

    fetchTemplates();
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
      <TemplateSubmitWrapper
        buttonText={editTemplate ? "Update Template" : "Add Template"}
        clickFunction={submitTemplateHandler}
      />
    </TemplatesSectionWrapper>
  );
};

export default TemplateForm;

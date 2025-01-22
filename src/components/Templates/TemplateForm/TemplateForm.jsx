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
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // If editTemplate is true, states are updated in order to update template later in a process
  useEffect(() => {
    if (editTemplate) {
      setTemplateName(editTemplate.name);
      setExercises(editTemplate.exercises);
      setTemplateID(editTemplate._id);
    }
  }, [editTemplate]);

  // Updating error state once exercises gets added if error is related to exercises
  useEffect(() => {
    if (exercises.length && error == "exercises") {
      setError("");
    }
  }, [exercises]);

  // Callback function, updates exercises state, getting values from AddExerciseInput.jsx
  const getExerciseInput = (exerciseName, exerciseSets) => {
    setExercises((prevExercises) => [
      ...prevExercises,
      { exercise_name: exerciseName, sets: exerciseSets, temp_id: uuidv4() },
    ]);
  };

  const submitTemplateHandler = async () => {
    if (!templateName) {
      setError("name");
      return;
    } else if (!exercises.length) {
      setError("exercises");
      return;
    }

    // Cleans exercises from unnecessary data before posting to db
    const transformedExercises = exercises.map((exercise) => ({
      exercise_name: exercise["exercise_name"],
      sets: exercise.sets,
      _id: exercise._id,
    }));

    const templateData = {
      name: templateName,
      exercises: transformedExercises,
    };

    // Posts or updates Template, depending if editTemplate is true or false
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
        setSuccessMessage(
          `Template ${!editTemplate ? "added" : "updated"} succesfully!`
        );

        setTimeout(() => {
          setSuccessMessage("");
        }, 6000);
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
    setError("");
  };

  return (
    <TemplatesSectionWrapper>
      <form className="px-1 py-1.5">
        <div className="pb-2">
          <label>Template name:</label>
          <input
            type="text"
            className={`ml-2 text-md outline-none border-2 rounded-md  ${
              error === "name" ? "border-primary" : "border-transparent"
            }`}
            onChange={(e) => setTemplateName(e.target.value)}
            value={templateName}
          />
        </div>

        <AddExerciseInput getInput={getExerciseInput} />
        {error ? (
          <p className="text-primary pt-1.5 text-sm">
            Please provide the missing template {error}
          </p>
        ) : (
          ""
        )}

        {successMessage ? (
          <p className="text-emerald-600 pt-1.5 text-sm">{successMessage}</p>
        ) : (
          ""
        )}

        <TemplateExercises exercises={exercises} setExercises={setExercises} />
        <TemplateSubmitWrapper
          buttonText={editTemplate ? "Update Template" : "Add Template"}
          clickFunction={submitTemplateHandler}
        />
      </form>
    </TemplatesSectionWrapper>
  );
};

export default TemplateForm;

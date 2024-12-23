import React, { useEffect, useState } from "react";
import { useTemplates } from "../../context/TemplateContext";
import Button from "../Button";
import { postRecordService } from "../../services/recordServices";
import { useAuth } from "../../context/AuthContext";

const RecordForm = () => {
  const [selectTemplateID, setSelectTemplateID] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [error, setError] = useState("");
  const { templates } = useTemplates();
  const { token } = useAuth();

  // Useffect hook finds what template user choosen and modifies it to match records model
  useEffect(() => {
    setError("");
    const findTemplate = templates.find(
      (template) => template._id == selectTemplateID
    );

    if (findTemplate) {
      const transformedExercises = findTemplate.exercises.map((exercise) => ({
        ...exercise,
        weight: 0,
        sets: 0,
        reps: [],
      }));

      const record = {
        template_id: findTemplate._id,
        exercises: transformedExercises,
      };

      setSelectedTemplate(record);
    }
  }, [selectTemplateID]);

  // Updates exercises when weight/sets/reps input changes.
  const exerciseUpdate = (exerciseID, key, value, repIndex) => {
    let updatedExercises;

    // If sets is selected reps is extracted from selectedTemplates, then length (count of reps fields) gets adjusted to provided value
    if (key === "sets") {
      let exercise = selectedTemplate.exercises.find(
        (ex) => ex._id == exerciseID
      );
      let reps = exercise.reps;

      if (reps.length < value) {
        reps = reps.concat(Array(value - reps.length).fill(0));
      } else {
        reps.length = value;
      }

      updatedExercises = selectedTemplate.exercises.map((ex) =>
        ex._id === exerciseID ? { ...ex, [key]: value, reps } : ex
      );
    } else if (key === "weight") {
      updatedExercises = selectedTemplate.exercises.map((ex) =>
        ex._id === exerciseID ? { ...ex, [key]: value } : ex
      );
    } else if (key === "reps") {
      updatedExercises = selectedTemplate.exercises.map((ex) =>
        ex._id === exerciseID
          ? {
              ...ex,
              [key]: ex[key].map((rep, index) =>
                index === repIndex ? value : rep
              ),
            }
          : ex
      );
    }

    setSelectedTemplate({ ...selectedTemplate, exercises: updatedExercises });
  };

  // Generating array with desired length. Used for mapping options.
  const arrayGen = (count) => {
    return Array.from({ length: count }, (_, i) => i + 1);
  };

  // Handling and validating submission.
  const submitHandler = async (e) => {
    e.preventDefault();

    // Checking if weight/sets and reps is not empty, combining both arrays using Set and setting error if some fields are empty
    const weightSetsValidation = selectedTemplate.exercises
      .filter((exercise) => exercise.weight <= 0 || exercise.sets <= 0)
      .map((exercise) => exercise._id);

    const repsValidation = selectedTemplate.exercises
      .filter((exercise) => exercise.reps.some((rep) => rep <= 0))
      .map((exercise) => exercise._id);

    const errors = [...new Set([...weightSetsValidation, ...repsValidation])];

    if (errors.length) {
      setError(errors);
      return;
    }

    try {
      const response = await postRecordService(
        selectedTemplate,
        `Bearer ${token}`
      );
      if (response == 201) {
        console.log("Record added succesfully");
      }
    } catch (error) {
      console.error("Error when trying to post a record", error);
    }
  };

  return (
    <form>
      <div>
        <label>Choose template: </label>
        <select
          onChange={(e) => setSelectTemplateID(e.target.value)}
          value={selectTemplateID}
        >
          <option value="" disabled>
            -- Select a template --
          </option>
          {templates.map((template) => {
            return (
              <option value={template._id} key={template._id}>
                {template.name}
              </option>
            );
          })}
        </select>
      </div>

      {selectedTemplate ? (
        <div>
          <h1>Your exercises:</h1>
          <ul className="px-2">
            {selectedTemplate.exercises.map((exercise) => {
              return (
                <li
                  className={`flex py-1 flex-wrap bg-secondary mb-3 px-2 rounded-xl border-2 ${
                    error.includes(exercise._id) ? "border-primary" : ""
                  }`}
                >
                  <h2 className="mr-4">{exercise.exercise_name}</h2>

                  <label>Weight:</label>
                  <input
                    type="number"
                    className="w-12"
                    value={exercise.weight}
                    min="0"
                    onChange={(e) => {
                      exerciseUpdate(
                        exercise._id,
                        "weight",
                        Number(e.target.value)
                      );
                    }}
                  />

                  <label>Sets:</label>
                  <select
                    onChange={(e) => {
                      exerciseUpdate(
                        exercise._id,
                        "sets",
                        Number(e.target.value)
                      );
                    }}
                    value={exercise.sets}
                  >
                    <option selected>0</option>
                    {arrayGen(10).map((set) => {
                      return (
                        <option value={set} key={set}>
                          {set}
                        </option>
                      );
                    })}
                  </select>

                  {exercise.sets ? (
                    <div className="w-full flex">
                      <label>Reps:</label>
                      {arrayGen(exercise.sets).map((rep, index) => {
                        return (
                          <>
                            <input
                              type="number"
                              className="w-8 mr-2"
                              value={exercise.reps[index]}
                              min="0"
                              onChange={(e) => {
                                exerciseUpdate(
                                  exercise._id,
                                  "reps",
                                  Number(e.target.value),
                                  index
                                );
                              }}
                            />
                          </>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
          </ul>
          {error.length ? (
            <p className="text-primary">Missing or invalid fields</p>
          ) : (
            ""
          )}
          <Button
            style="bg-accent px-4 py-1 rounded-3xl block mx-auto"
            onClick={(e) => submitHandler(e)}
            text="Add New Record"
          />
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default RecordForm;

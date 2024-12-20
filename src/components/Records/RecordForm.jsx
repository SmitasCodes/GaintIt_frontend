import React, { useEffect, useState } from "react";
import { useTemplates } from "../../context/TemplateContext";
import Button from "../Button";

const RecordForm = () => {
  const [selectTemplateID, setSelectTemplateID] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { templates } = useTemplates();

  useEffect(() => {
    const findTemplate = templates.find(
      (template) => template._id == selectTemplateID
    );

    if (findTemplate) {
      const transformedExercises = findTemplate.exercises.map((exercise) => ({
        ...exercise,
        weight: "",
        sets: "",
        reps: [],
      }));

      const record = {
        template_id: findTemplate._id,
        exercises: transformedExercises,
      };

      setSelectedTemplate(record);
    }
  }, [selectTemplateID]);

  const exerciseUpdate = (exerciseID, key, value, repIndex) => {
    let reps = [];
    key == "sets" ? (reps = Array(value).fill("")) : "";

    let updatedExercises;
    if (key != "reps") {
      updatedExercises = selectedTemplate.exercises.map((ex) =>
        ex._id === exerciseID ? { ...ex, [key]: value, reps } : ex
      );
    } else {
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

  // Generating array with desired length. Used for for mapping options.
  const arrayGen = (count) => {
    return Array.from({ length: count }, (_, i) => i + 1);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!selectedTemplate.template_id) {
      console.log("template_id is missing");
      return;
    }
    console.log(selectedTemplate);
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
                <li className="flex py-1 flex-wrap bg-secondary mb-3 px-2 rounded-xl">
                  <h2 className="mr-4">{exercise.exercise_name}</h2>

                  <label>Weight:</label>
                  <input
                    type="number"
                    className="w-12"
                    value={exercise.weight}
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
            {/* <button onClick={(e) => submitHandler(e)}>Add New Record</button> */}
          </ul>
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

import React, { useEffect, useState } from "react";
import { useTemplates } from "../../context/TemplateContext";
import { postRecordService } from "../../services/recordServices";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { arrayGen } from "../../utils/arrayGen";

const RecordForm = () => {
  const [selectTemplateID, setSelectTemplateID] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [error, setError] = useState([]);
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
        setError("");
        setSelectedTemplate(null);
        setSelectTemplateID("");
      }
    } catch (error) {
      console.error("Error when trying to post a record", error);
    }
  };

  return (
    <form className="p-2">
      <div className="mb-4">
        <label>Choose a template: </label>
        <select
          className="py-0.5 px-2 rounded-lg"
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

      {selectedTemplate && (
        <>
          <table className="w-full border-black border">
            <thead>
              <tr>
                <th className=" border-black border pl-1 py-1">Name</th>
                <th className=" border-black border pl-1">Weight</th>
                <th className=" border-black border pl-1">Sets</th>
                <th className=" border-black border pl-1">Reps</th>
              </tr>
            </thead>
            <tbody>
              {selectedTemplate.exercises.map(
                ({ _id, exercise_name, weight, sets, reps }) => {
                  return (
                    <tr
                      key={_id}
                      className={`${error.includes(_id) ? "bg-red-400" : ""}`}
                    >
                      <td className=" border-black border pl-1">
                        {exercise_name}
                      </td>
                      <td className=" border-black border pl-1">
                        <input
                          type="number"
                          className="w-8"
                          value={weight}
                          min="0"
                          onChange={(e) => {
                            exerciseUpdate(
                              _id,
                              "weight",
                              Number(e.target.value)
                            );
                          }}
                        />
                      </td>
                      <td className=" border-black border pl-1">
                        <select
                          onChange={(e) => {
                            exerciseUpdate(_id, "sets", Number(e.target.value));
                          }}
                          value={sets}
                        >
                          {arrayGen(11).map((set) => {
                            return (
                              <option value={set} key={set} disabled={set == 0}>
                                {set}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td className=" border-black border pl-1">
                        {arrayGen(sets).map((index) => {
                          return (
                            <>
                              <input
                                type="number"
                                className="w-8 mr-2"
                                value={reps[index]}
                                min="0"
                                onChange={(e) => {
                                  exerciseUpdate(
                                    _id,
                                    "reps",
                                    Number(e.target.value),
                                    index
                                  );
                                }}
                              />
                            </>
                          );
                        })}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          {error.length > 0 && (
            <p className="text-primary mt-1">Missing or invalid fields</p>
          )}
          <Button
            style="bg-accent px-4 py-1 text-sm rounded-3xl block mx-auto my-2"
            onClick={(e) => submitHandler(e)}
            text="Add New Record"
          />
        </>
      )}
    </form>
  );
};

export default RecordForm;

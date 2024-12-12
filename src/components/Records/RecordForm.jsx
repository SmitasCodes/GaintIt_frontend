import React, { useEffect, useState } from "react";
import { useTemplates } from "../../context/TemplateContext";

const RecordForm = () => {
  const [selectTemplateID, setSelectTemplateID] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { templates } = useTemplates();

  useEffect(() => {
    const searchTemplate = templates.find(
      (template) => template._id == selectTemplateID
    );

    if (searchTemplate) {
      const transformedExercises = searchTemplate.exercises.map((exercise) => ({
        ...exercise,
        weight: 0,
        sets: 0,
        reps: 0,
      }));

      const result = {
        template_id: searchTemplate._id,
        exercises: transformedExercises,
      };

      setSelectedTemplate(result);
    }
  }, [selectTemplateID]);

  const setsOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  console.log(selectedTemplate);

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
                <li className="flex py-1 flex-wrap">
                  <h2 className="mr-4">{exercise.exercise_name}</h2>

                  <label>Weight:</label>
                  <input type="number" className="w-12" />

                  <label>Sets:</label>
                  <select
                    onChange={(e) => {
                      const updatedExerciseSet = selectedTemplate.exercises.map(
                        (ex) =>
                          ex._id === exercise._id
                            ? { ...ex, sets: Number(e.target.value) }
                            : ex
                      );

                      setSelectedTemplate({
                        ...selectedTemplate,
                        exercises: updatedExerciseSet,
                      });
                    }}
                  >
                    <option disabled selected>
                      0
                    </option>
                    {setsOptions.map((set) => {
                      return (
                        <option value={set} key={set}>
                          {set}
                        </option>
                      );
                    })}
                  </select>

                  <div>
                    <label>Reps: </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default RecordForm;

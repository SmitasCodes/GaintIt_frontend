import React, { useEffect, useState } from "react";
import { useTemplates } from "../../context/TemplateContext";

const RecordForm = () => {
  const [selectTemplate, setSelectTemplate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { templates } = useTemplates();

  const setsOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    const searchTemplate = templates.find(
      (template) => template._id == selectTemplate
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
  }, [selectTemplate]);

  console.log(selectedTemplate);

  return (
    <form>
      <div>
        <label>Choose template: </label>
        <select
          onChange={(e) => setSelectTemplate(e.target.value)}
          value={selectTemplate}
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
            {selectedTemplate.exercises.map((template) => {
              return (
                <li className="flex py-1">
                  <h2 className="mr-4">{template.exercise_name}</h2>
                  <label>Sets:</label>
                  <select>
                    <option defaultValue="" disabled selected>
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

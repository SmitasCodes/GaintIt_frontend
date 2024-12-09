import React, { useEffect, useState } from "react";
import { useTemplates } from "../../context/TemplateContext";

const RecordForm = () => {
  const [selectTemplate, setSelectTemplate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { templates } = useTemplates();

  useEffect(() => {
    setSelectedTemplate(
      templates.find((template) => template._id == selectTemplate)
    );
  }, [selectTemplate]);

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
          <label>Your exercises: </label>
          {selectedTemplate.exercises.map((template) => {
            return <h2>{template.exercise_name}</h2>;
          })}
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default RecordForm;

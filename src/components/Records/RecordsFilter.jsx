import React from "react";
import { useTemplates } from "../../context/TemplateContext";

const RecordsFilter = ({ selectedTemplate, setSelectedTemplate }) => {
  const { templates } = useTemplates();

  return (
    <select
      value={selectedTemplate}
      onChange={(e) => setSelectedTemplate(e.target.value)}
      className="mt-2 ml-2 py-1 px-2 rounded-lg text-md"
    >
      <option value="all">All templates</option>
      {templates.map((template) => {
        return (
          <option value={template._id} key={template._id}>
            {template.name}
          </option>
        );
      })}
    </select>
  );
};

export default RecordsFilter;

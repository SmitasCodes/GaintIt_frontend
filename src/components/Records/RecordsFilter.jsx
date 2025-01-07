import React from "react";
import { useTemplates } from "../../context/TemplateContext";

const RecordsFilter = () => {
  const { templates } = useTemplates();
  
  return (
    <div className="p-2">
      <select name="">
        <option value="all">All templates</option>
        {templates.map((template) => {
          return <option value={template._id} key={template._id} >
            {template.name}
          </option>;
        })}
      </select>
    </div>
  );
};

export default RecordsFilter;

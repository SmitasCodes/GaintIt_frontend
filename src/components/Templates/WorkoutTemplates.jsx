import React, { useState } from "react";
import TemplateForm from "./TemplateForm/TemplateForm";
import TemplatesList from "./TemplatesList";

const WorkoutTemplates = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTemplate, setEditTemplate] = useState("");

  return (
    <div className="h-[calc(50%-8px)] w-[50%] rounded-xl relative flex flex-col">
      <div className="flex h-8 justify-center items-center ">
        <a
          className="border-red-900 border-r-2 pr-2 cursor-pointer"
          onClick={() => setShowForm(false)}
        >
          All templates
        </a>
        <a className="pl-2 cursor-pointer" onClick={() => setShowForm(true)}>
          Add / Edit
        </a>
      </div>
      {!showForm ? (
        <TemplatesList
          setShowForm={setShowForm}
          setEditTemplate={setEditTemplate}
          editTemplate={editTemplate}
        />
      ) : (
        <TemplateForm
          editTemplate={editTemplate}
          setEditTemplate={setEditTemplate}
        />
      )}
    </div>
  );
};

export default WorkoutTemplates;

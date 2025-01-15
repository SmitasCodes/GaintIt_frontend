import React, { useState } from "react";
import TemplateForm from "./TemplateForm/TemplateForm";
import TemplatesList from "./TemplatesList";

const WorkoutTemplates = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTemplate, setEditTemplate] = useState("");

  return (
    <div className="h-[calc(50%-8px)] w-[50%] rounded-xl relative flex flex-col bg-secondary px-1 pb-1">
      <h2 className="mx-auto text-xl my-1">Templates</h2>
      <div className="flex h-8  items-center bg-secondary rounded-xl">
        <a
          className={`border-red-900 px-2 rounded-lg cursor-pointer ${
            !showForm ? "bg-accent" : ""
          }`}
          onClick={() => setShowForm(false)}
        >
          All templates
        </a>
        <a
          className={`px-2 rounded-lg cursor-pointer ${showForm ? "bg-accent" : ""}`}
          onClick={() => setShowForm(true)}
        >
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

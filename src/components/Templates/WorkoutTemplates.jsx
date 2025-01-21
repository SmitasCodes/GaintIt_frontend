import React, { useState } from "react";
import TemplateForm from "./TemplateForm/TemplateForm";
import TemplatesList from "./TemplatesList";
import Button from "../Button";

const WorkoutTemplates = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTemplate, setEditTemplate] = useState("");

  return (
    <div className="h-[calc(50%-8px)] w-[50%] rounded-xl relative flex flex-col bg-secondary px-1 pb-1">
      <h2 className="mx-auto text-xl my-1">Templates</h2>

      {/* Handles navigation in templates component between templates list and templates 'Add / Edit' form */}
      <div className="flex h-8 items-center bg-secondary rounded-xl pb-1 relative">
        <Button
          style="ml-0.5 cursor-pointer relative  py-0.5"
          onClick={() => setShowForm(false)}
          text="All templates"
        />
        <Button
          style="ml-2 cursor-pointer relative py-0.5"
          onClick={() => setShowForm(true)}
          text="Add / Edit"
        />
        {/* This span dynamically shows under navigation buttons when they are active*/}
        <span
          className={`h-1 bg-accent absolute bottom-1 transition-all ease-in-out ${
            showForm ? "translate-x-24 w-20" : "w-24"
          }`}
        ></span>
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

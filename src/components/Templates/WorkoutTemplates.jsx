import React, { useEffect, useState } from "react";
import {
  getAllTemplatesService,
} from "../../services/templateServices";
import TemplateForm from "./TemplateForm/TemplateForm";
import TemplatesList from "./TemplatesList";

const WorkoutTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTemplate, setEditTemplate] = useState("");

  const fetchTemplates = async () => {
    try {
      const templatesRes = await getAllTemplatesService();
      setTemplates(templatesRes);
    } catch (error) {
      console.error("Error when fetching templates: ", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="bg-red-300 w-96 h-96 m-auto relative flex flex-col">
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
          templates={templates}
          setTemplates={setTemplates}
          setShowForm={setShowForm}
          setEditTemplate={setEditTemplate}
          editTemplate={editTemplate}
        />
      ) : (
        <TemplateForm
          refetchTemplates={fetchTemplates}
          editTemplate={editTemplate}
          setEditTemplate={setEditTemplate}
        />
      )}
    </div>
  );
};

export default WorkoutTemplates;

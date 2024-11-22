import React, { useEffect, useState } from "react";
import {
  deleteTemplateService,
  getAllTemplatesService,
} from "../../services/templateServices";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import TemplateForm from "./TemplateForm/TemplateForm";
import TemplatesSectionWrapper from "./TemplatesSectionWrapper";

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

  const handleDelete = async (templateId) => {
    console.log("Deleting template with ID:", templateId);

    try {
      await deleteTemplateService(templateId);
      const templatesRes = await getAllTemplatesService();
      console.log("Template deleted succesfully");
      setTemplates(templatesRes);
    } catch (error) {
      console.error("Error when deleting template:", error);
    }
  };

  const handleEdit = (template) => {
    setEditTemplate(template);
    setShowForm(true);
  };

 

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
        <TemplatesSectionWrapper>
          <ul className="px-1">
            {!templates ? (
              <p className="text-center py-2 text-sm">No templates found</p>
            ) : (
              templates.map((template) => {
                return (
                  <li
                    className="bg-red-400 my-2 px-3 flex justify-between rounded-md"
                    key={template._id}
                  >
                    {template.name}
                    <div className="flex items-center">
                      <CiEdit
                        className="mr-2 cursor-pointer"
                        title="edit"
                        onClick={() => handleEdit(template)}
                      />
                      <MdDelete
                        className="cursor-pointer"
                        title="delete"
                        onClick={() => handleDelete(template._id)}
                      />
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </TemplatesSectionWrapper>
      ) : (
        <TemplateForm
          refetchTemplates={fetchTemplates}
          editTemplate={editTemplate}
        />
      )}
    </div>
  );
};

export default WorkoutTemplates;

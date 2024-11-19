import React, { useEffect, useState } from "react";
import {
  deleteTemplateService,
  getAllTemplatesService,
} from "../../services/templateServices";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import TemplateForm from "./TemplateForm";
import TemplatesSectionWrapper from "./TemplatesSectionWrapper";
import TemplateSubmitButton from "./TemplateSubmitButton";

const WorkoutTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesRes = await getAllTemplatesService();
        setTemplates(templatesRes);
      } catch (error) {
        console.error("Error when fetching templates: ", error);
      }
    };

    fetchTemplates();
  }, []);
  if (showForm) {
    console.log("big");
  }
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

  return (
    <div className="bg-red-300 w-96 h-96 m-auto relative flex flex-col">
      <h2 className="text-center py-2">Templates</h2>
      {!showForm ? (
        <TemplatesSectionWrapper>
          <ul>
            {!templates ? (
              <p className="text-center py-2 text-sm">No templates found</p>
            ) : (
              templates.map((template) => {
                return (
                  <li
                    className="bg-red-400 mb-2 px-3 flex justify-between"
                    key={template._id}
                  >
                    {template.name}
                    <div className="flex items-center">
                      <CiEdit className="mr-2 cursor-pointer" title="edit" />
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
          <TemplateSubmitButton
            buttonText={"Add New Template"}
            clickFunction={() => setShowForm(!showForm)}
          />
        </TemplatesSectionWrapper>
      ) : (
        <TemplateForm />
      )}
      {/* <div className="h-10 w-full absolute bottom-0 transform bg-red-300 flex justify-center items-center">
        <button
          className="px-4 py-1 bg-red-500 rounded-2xl"
          onClick={() => setShowForm(!showForm)}
        >
          Add template
        </button>
      </div> */}
    </div>
  );
};

export default WorkoutTemplates;

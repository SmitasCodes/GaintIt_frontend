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

  const fetchTemplates = async () => {
    console.log("ssss")
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

  return (
    <div className="bg-red-300 w-96 h-96 m-auto relative flex flex-col">
      {/* <h2 className="text-center py-2">Templates | Add new</h2> */}
      <div className="flex h-8 justify-center items-center">
        <a
          className="border-red-900 border-r-2 pr-2"
          onClick={() => setShowForm(false)}
        >
          All templates
        </a>
        <a className="pl-2" onClick={() => setShowForm(true)}>
          Add/Edit
        </a>
      </div>
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
        </TemplatesSectionWrapper>
      ) : (
        <TemplateForm
          setShowForm={setShowForm}
          refetchTemplates={fetchTemplates}
        />
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

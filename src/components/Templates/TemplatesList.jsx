import React, { useEffect } from "react";
import TemplatesSectionWrapper from "./TemplatesSectionWrapper";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  deleteTemplateService,
  getAllTemplatesService,
} from "../../services/templateServices";

const TemplatesList = ({
  templates,
  setTemplates,
  setShowForm,
  editTemplate,
  setEditTemplate,
}) => {
  useEffect(() => {
    setEditTemplate("");
  }, [editTemplate]);

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
  );
};

export default TemplatesList;

import React, { useEffect } from "react";
import TemplatesSectionWrapper from "./TemplatesSectionWrapper";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  deleteTemplateService,
  getAllTemplatesService,
} from "../../services/templateServices";
import { useAuth } from "../../context/AuthContext";
import { useTemplates } from "../../context/TemplateContext";

const TemplatesList = ({ setShowForm, setEditTemplate }) => {
  const { token } = useAuth();
  const { templates, setTemplates } = useTemplates();

  useEffect(() => {
    setEditTemplate("");
  }, []);

  const handleDelete = async (templateId) => {
    try {
      await deleteTemplateService(templateId, `Bearer ${token}`);
      const templatesRes = await getAllTemplatesService(`Bearer ${token}`);
      setTemplates(templatesRes);
      console.log("Template deleted succesfully");
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
        {!templates.length ? (
          <p className="text-center py-2 text-sm">No templates found</p>
        ) : (
          templates.map((template) => {
            return (
              <li
                className="bg-secondary my-2 px-3 flex justify-between rounded-md"
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

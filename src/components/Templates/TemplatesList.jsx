import React, { useEffect } from "react";
import TemplatesSectionWrapper from "./TemplatesSectionWrapper";
import {
  deleteTemplateService,
  getAllTemplatesService,
} from "../../services/templateServices";
import { useAuth } from "../../context/AuthContext";
import { useTemplates } from "../../context/TemplateContext";
import Button from "../Button";

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
                className="bg-secondary my-2 py-0.5 px-3 flex justify-between rounded-md"
                key={template._id}
              >
                {template.name}
                <div className="flex items-center">
                  <Button
                    style="bg-emerald-400 px-2 rounded-md mr-2"
                    type="button"
                    text="Edit"
                    onClick={() => handleEdit(template)}
                  ></Button>
                  <Button
                    style="bg-primary px-2 rounded-md"
                    type="button"
                    text="Delete"
                    onClick={() => handleDelete(template)}
                  >
                    Delete
                  </Button>
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

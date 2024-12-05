import { useContext, createContext, useState, useEffect } from "react";
import { getAllTemplatesService } from "../services/templateServices";
import { useAuth } from "./AuthContext";

const TemplateContext = createContext();

const useTemplates = () => {
  return useContext(TemplateContext) || {};
};

const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);
  const { token } = useAuth();

  const fetchTemplates = async () => {
    try {
      const templatesRes = await getAllTemplatesService(`Bearer ${token}`);
      setTemplates(templatesRes);
    } catch (error) {
      console.error("Error when fetching templates: ", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [token]);

  return (
    <TemplateContext.Provider
      value={{ templates, setTemplates, fetchTemplates }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export { TemplateProvider, useTemplates };

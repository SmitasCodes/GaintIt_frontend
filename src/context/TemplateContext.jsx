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
      const response = await getAllTemplatesService(`Bearer ${token}`);

      setTemplates(response || []);
    } catch (error) {
      console.error("Error when fetching templates: ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTemplates();
    } else {
      setTemplates([]);
    }
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

import { useContext, createContext, useState, useEffect } from "react";
import { getRecordsService } from "../services/recordServices";
import { useAuth } from "./AuthContext";

const RecordsContext = createContext();

const useRecords = () => {
  return useContext(RecordsContext) || {};
};

const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { token } = useAuth();

  const fetchRecords = async () => {
    try {
      const response = await getRecordsService(`Bearer ${token}`);
      setRecords(response || []);
    } catch (error) {
      console.error("Error when fetching workout records:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRecords();
    } else {
      setRecords([]);
    }
  }, [token]);

  return (
    <RecordsContext.Provider value={{ records, setRecords, fetchRecords }}>
      {children}
    </RecordsContext.Provider>
  );
};

export { useRecords, RecordsProvider };

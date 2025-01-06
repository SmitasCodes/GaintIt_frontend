import React, { useEffect, useState } from "react";
import { getRecordsService } from "../../services/recordServices";
import { useAuth } from "../../context/AuthContext";

const RecordsList = () => {
  const [records, setRecords] = useState([]);
  const { token } = useAuth();

  const fetchRecords = async () => {
    try {
      const response = await getRecordsService(`Bearer ${token}`);
      if (!response) {
        setRecords([]);
      } else {
        // const modifiedResponse = response.map((res) => ({...res, workout_date: res.workout_date.getMonth()}))
        setRecords(response);
      }
    } catch (error) {
      console.error("Error when posting workout record:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      {!records.length ? (
        <p className="text-center">No records found</p>
      ) : (
        <ul className="p-2">
          {records.map((record) => {
            return (
              <li key={record._id}>
                <span>{record.template_name}</span>
                <span>{record.workout_date}</span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default RecordsList;

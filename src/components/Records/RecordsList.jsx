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
        // Displaying time in user time zone, also changing format to YYYY-MM-DD HH:MM 
        const dateFormation = (workoutDate) => {
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const date = new Date(workoutDate).toLocaleString("en-GB", {
            timeZone: timeZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });

          const year = date.slice(6, 10);
          const month = date.slice(0, 2);
          const day = date.slice(3, 5);
          const hour = date.slice(12, 14);
          const minute = date.slice(15, 17);

          const dateFormatted = `${year}-${month}-${day} ${hour}:${minute}`;
          return dateFormatted;
        };

        const modifiedResponse = response.map((record) => ({
          ...record,
          workout_date: dateFormation(record.workout_date),
        }));

        setRecords(modifiedResponse);
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
              <li key={record._id} className="bg-secondary mb-2">
                <span>{record.template_name}</span>
                <span className="float-right">{record.workout_date}</span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default RecordsList;

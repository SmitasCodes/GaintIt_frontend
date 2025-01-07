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
        // Converting time to the user's time zone and formatting it as YYYY-MM-DD HH:MM
        const dateFormation = (workoutDate) => {
          const dateObj = new Date(workoutDate);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const day = String(dateObj.getDate()).padStart(2, "0");
          const hour = String(dateObj.getHours()).padStart(2, "0");
          const minute = String(dateObj.getMinutes()).padStart(2, "0");

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
              <li
                key={record._id}
                className="bg-secondary mb-2 py-1 px-2 rounded-lg flex justify-between items-center"
              >
                <span>{record.template_name}</span>
                <time
                  className="text-sm"
                  dateTime={record.workout_date.replace(" ", "T")}
                >
                  {record.workout_date}
                </time>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default RecordsList;

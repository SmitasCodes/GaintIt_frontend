import React, { useMemo, useState, useEffect } from "react";
import { useRecords } from "../../context/RecordsContext";
import { formatDate } from "../../utils/formatDate";

const RecordsList = ({ selectedTemplate }) => {
  const { records } = useRecords();
  const [selectedRecordId, setSelectedRecordId] = useState("");

  useEffect(() => {
    setSelectedRecordId("");
  }, [selectedTemplate]);

  const filteredRecords = useMemo(() => {
    if (selectedTemplate === "all") return records;
    return records.filter((record) => selectedTemplate === record.template_id);
  }, [selectedTemplate, records]);

  const handleRecordClick = (recordID) => {
    if (recordID === selectedRecordId) {
      setSelectedRecordId("");
      return;
    }

    setSelectedRecordId(recordID);
  };

  return (
    <>
      {!filteredRecords.length ? (
        <p className="text-center">No records found</p>
      ) : (
        <ul className="p-2">
          {filteredRecords.map((record) => {
            return (
              <li
                key={record._id}
                className="bg-secondary mb-2 py-1 px-2 rounded-lg cursor-pointer"
                onClick={() => handleRecordClick(record._id)}
              >
                <div className="flex justify-between items-center">
                  <span>{record.template_name}</span>
                  <time className="text-sm" dateTime={record.workout_date}>
                    {formatDate(record.workout_date)}
                  </time>
                </div>

                {selectedRecordId == record._id ? (
                  <table className="w-full border-collapse border-black border mb-1">
                    <thead>
                      <tr>
                        <th className="border-collapse border-black border pl-1">
                          Name
                        </th>
                        <th className="border-collapse border-black border  pl-1">
                          Weight
                        </th>
                        <th className="border-collapse border-black border  pl-1">
                          Sets
                        </th>
                        <th className="border-collapse border-black border  pl-1">
                          Reps
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.exercises.map(
                        ({ _id, exercise_name, weight, sets, reps }) => {
                          return (
                            <tr key={_id}>
                              <td className="border-collapse border-black border  pl-1">
                                {exercise_name}
                              </td>
                              <td className="border-collapse border-black border  pl-1">
                                {weight}
                              </td>
                              <td className="border-collapse border-black border  pl-1">
                                {sets}
                              </td>
                              <td className="border-collapse border-black border  pl-1">
                                {reps.map((rep, index) =>
                                  index < reps.length - 1
                                    ? `${rep}, `
                                    : `${rep}`
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default RecordsList;

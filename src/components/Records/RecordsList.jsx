import React, { useCallback, useMemo } from "react";
import { useRecords } from "../../context/RecordsContext";
import { formatDate } from "../../utils/formatDate";

const RecordsList = ({ selectedTemplate }) => {
  const { records } = useRecords();

  const filteredRecords = useMemo(() => {
    if (selectedTemplate === "all") return records;
    return records.filter((record) => selectedTemplate === record.template_id);
  }, [selectedTemplate, records]);

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
                className="bg-secondary mb-2 py-1 px-2 rounded-lg flex justify-between items-center"
              >
                <span>{record.template_name}</span>
                <time className="text-sm" dateTime={record.workout_date}>
                  {formatDate(record.workout_date)}
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

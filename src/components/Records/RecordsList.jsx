import React from "react";

const RecordsList = ({ records }) => {
  return (
    <ul className="p-2">
      {!records.length ? (
        <p className="text-center">No records found</p>
      ) : (
        records.map((record) => {
          return (
            <li className="bg-secondary mb-2 py-1 px-4 rounded-2xl">
              {record.template_name}
              <span className="float-right">{record.date}</span>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default RecordsList;

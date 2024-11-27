import React from "react";

const RecordsList = ({ records }) => {
  return (
    <ul className="p-2">
      {records.map((record) => {
        return (
          <li className="bg-secondary mb-2 py-1 px-2 rounded-2xl">
            {record.template_name}
            {record.date}
          </li>
        );
      })}
    </ul>
  );
};

export default RecordsList;

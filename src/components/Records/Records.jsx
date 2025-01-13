import React, { useState } from "react";
import RecordsList from "./RecordsList";
import RecordForm from "./RecordForm";
import RecordsFilter from "./RecordsFilter";

const Records = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("all");

  return (
    <div className="flex-grow flex flex-col w-[calc(50%-8px)] rounded-md border-2 bg-secondary">
      <h2 className="py-1.5 text-center text-xl text-neutral">Records</h2>
      <div className="flex-grow bg-neutral  rounded-lg mx-1">
        {!showForm ? (
          <>
            <RecordsFilter
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
            <RecordsList selectedTemplate={selectedTemplate} />
          </>
        ) : (
          <RecordForm />
        )}
      </div>
      <div className="h-10 flex items-center justify-end">
        <button
          className="text-md py-0.5 px-2 bg-accent rounded-md mr-1"
          onClick={() => setShowForm(!showForm)}
        >
          {!showForm ? "Add Record" : "Records"}
        </button>
      </div>
    </div>
  );
};

export default Records;

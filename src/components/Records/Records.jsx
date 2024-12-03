import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import RecordsList from "./RecordsList";
import RecordForm from "./RecordForm";
import { useTemplates } from "../../context/TemplateContext";

const Records = () => {
  const [showForm, setShowForm] = useState(false);
  const record = [];

  const { templates } = useTemplates();

  console.log(templates);

  return (
    <div className="flex-grow flex flex-col w-[calc(50%-8px)] rounded-xl border-2 border-accent bg-secondary">
      <h2 className="py-1.5 text-center text-xl text-neutral">Records</h2>
      <div className="flex-grow bg-neutral rounded-xl">
        {!showForm ? <RecordsList records={record} /> : <RecordForm />}
      </div>
      <div className="h-14 flex items-center justify-end">
        <IoIosAddCircleOutline
          className="w-12 h-auto mr-2 text-accent"
          onClick={() => setShowForm(true)}
        />
      </div>
    </div>
  );
};

export default Records;

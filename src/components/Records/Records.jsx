import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import RecordsList from "./RecordsList";

const Records = () => {
  const record = [
    {
      template_name: "Pull Day",
      date: "2024-10-20",
    },
    {
      template_name: "Push Day",
      date: "2024-10-21",
    },
    {
      template_name: "Leg Day",
      date: "2024-10-22",
    },
  ];
  return (
    <div className="flex-grow flex flex-col w-[calc(50%-8px)] rounded-xl border-2 border-accent bg-secondary">
      <h2 className="py-1.5 text-center text-xl text-neutral">Records</h2>
      <div className="flex-grow bg-neutral rounded-xl">
        <RecordsList records={record} />
      </div>
      <div className="h-14 flex items-center justify-end">
        <IoIosAddCircleOutline className="w-12 h-auto mr-2 text-accent" />
      </div>
    </div>
  );
};

export default Records;

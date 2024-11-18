import React, { useEffect, useState } from "react";
import { getAllTemplatesService } from "../../services/templateServices";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const WorkoutTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesRes = await getAllTemplatesService();
        setTemplates(templatesRes);
      } catch (error) {
        console.error("Error when fetching templates: ", error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="bg-red-300 w-96 h-96 m-auto relative">
      <h2 className="text-center py-2">Templates</h2>
      <ul>
        {templates.map((template) => {
          return (
            <li className="bg-red-400 mb-2 px-3 flex justify-between ">
              {template.name}
              <div className="flex items-center">
                <CiEdit className="mr-2 cursor-pointer" title="edit"/>
                <MdDelete className="cursor-pointer" title="delete"/>
              </div>
            </li>
          );
        })}
      </ul>
      <button className="px-4 py-1 bg-red-500 rounded-2xl absolute bottom-2 left-1/2  transform -translate-x-1/2">Add template</button>
    </div>
  );
};

export default WorkoutTemplates;

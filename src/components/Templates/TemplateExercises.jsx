import React from "react";
import { MdDelete } from "react-icons/md";

const TemplateExercises = ({ exercises, setExercises }) => {
  const handleDelete = (exerciseID) => {
    setExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id != exerciseID)
    );
  };

  return (
    <ul>
      {!exercises ? (
        <p></p>
      ) : (
        exercises.map((exercise) => {
          return (
            <li
              key={exercise.id}
              className="flex justify-between items-center bg-red-300 mb-2 px-2 rounded-xl"
            >
              {exercise["exercise_name"]}
              <MdDelete
                className="cursor-pointer"
                title="delete"
                onClick={() => handleDelete(exercise.id)}
              ></MdDelete>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default TemplateExercises;

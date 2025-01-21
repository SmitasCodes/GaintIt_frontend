import React from "react";
import Button from "../Button";

const TemplateExercises = ({ exercises, setExercises }) => {
  const handleDelete = (exercise) => {
    setExercises((prevExercises) =>
      prevExercises.filter((ex) => ex[exercise[0]] != exercise[1])
    );
  };

  return (
    <>
      <h2 className="text-center pt-1 text-lg">Exercises</h2>
      <ul>
        {!exercises.length ? (
          <p className="text-center mb-3">No exercises have been added yet</p>
        ) : (
          exercises.map((exercise) => {
            return (
              <li
                key={exercise._id || exercise.temp_id}
                className="flex items-center bg-secondary mb-2 px-1.5 py-0.5 rounded-xl"
              >
                {exercise["exercise_name"]}
                <span className="w-1.5 h-1.5 mx-2 bg-current rounded-full"></span>
                <Button
                  style="cursor-pointer bg-primary px-2 rounded-lg ml-auto text-md"
                  text="Delete"
                  onClick={() =>
                    handleDelete(
                      exercise._id
                        ? ["_id", exercise._id]
                        : ["temp_id", exercise.temp_id]
                    )
                  }
                />
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};

export default TemplateExercises;

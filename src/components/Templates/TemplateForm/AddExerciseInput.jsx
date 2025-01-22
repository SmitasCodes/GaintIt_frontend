import React, { useState } from "react";

const AddExerciseInput = ({ getInput }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState("");
  const [error, setError] = useState("");

  const addExerciseButtonHandler = (e) => {
    e.preventDefault();

    if (!exerciseName) {
      setError("name");
      return;
    } else if (exerciseSets <= 0) {
      setError("sets");
      return;
    }

    getInput(exerciseName, exerciseSets);
    setExerciseName("");
    setExerciseSets("");
    setError("");
  };

  return (
    <div className="flex flex-wrap">
      <label>Exercise name:</label>
      <input
        type="text"
        onChange={(e) => setExerciseName(e.target.value)}
        value={exerciseName}
        className={`outline-none ml-1 w-24 mr-2 rounded-md pl-1 border-2 border-transparent  ${
          error === "name" && "border-primary"
        }`}
      />

      <label>Sets:</label>
      <input
        type="number"
        onChange={(e) => setExerciseSets(e.target.value)}
        value={exerciseSets}
        min="0"
        max="10"
        className={`outline-none ml-2 w-10 border-2 border-transparent rounded-md ${
          error === "sets" && "border-primary"
        }`}
      />

      <button
        className={`bg-accent px-1 inline ml-2`}
        onClick={addExerciseButtonHandler}
      >
        Add exercise
      </button>
      {error && (
        <p className="w-full text-primary pt-1.5 text-sm">
          Please provide the missing exercise {error}.
        </p>
      )}
    </div>
  );
};

export default AddExerciseInput;

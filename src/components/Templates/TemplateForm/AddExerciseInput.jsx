import React, { useState } from "react";

const AddExerciseInput = ({ getInput }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState("");

  const addExerciseButtonHandler = (e) => {
    e.preventDefault();
    if (!exerciseName) {
      console.log("Please enter exercise name");
      return;
    }

    getInput(exerciseName, exerciseSets);
    setExerciseName("");
  };

  return (
    <div className="flex">
      <label>Exercise name:</label>
      <input
        type="text"
        onChange={(e) => setExerciseName(e.target.value)}
        value={exerciseName}
        className="outline-none ml-1 w-24 mr-2"
      />

      <label>Sets:</label>
      <input
        type="number"
        onChange={(e) => setExerciseSets(e.target.value)}
        value={exerciseSets}
        min="0"
        max="10"
        className="outline-none ml-2 w-10"
      />

      <button
        className={`bg-accent px-1 inline ml-2`}
        onClick={addExerciseButtonHandler}
      >
        Add exercise
      </button>
    </div>
  );
};

export default AddExerciseInput;

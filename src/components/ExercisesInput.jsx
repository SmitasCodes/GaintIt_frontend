import React, { useRef, useState } from "react";

const ExercisesInput = () => {
  const [showExerciseAddBtn, setShowExerciseAddBtn] = useState(false);
  const inputRef = useRef(0);

  const addExerciceButton = (e) => {
    if (e.target.value) {
      setShowExerciseAddBtn(true);
    } else {
      setShowExerciseAddBtn(false);
    }
  };

  return (
    <div className="flex bg-red-900 justify-between">
      <label>Exercise name:</label>
      <input type="text" onChange={addExerciceButton} ref={inputRef} />
      <button
        className={`bg-red-500 px-1 ${
          showExerciseAddBtn ? "opacity-1" : "opacity-0"
        }`}
      >
        Add
      </button>
    </div>
  );
};

export default ExercisesInput;

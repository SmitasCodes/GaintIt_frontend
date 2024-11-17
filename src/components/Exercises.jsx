import React, { useEffect, useState } from "react";
import axios from "axios";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showExerciseAddBtn, setShowExerciseAddBtn] = useState(false);

  const handleAddTemplateClick = () => {
    setShowTemplate(!showTemplate);
  };

  const renderAddExerciseInput = () => {
    const addAddExerciceButton = (e) => {
      if (e.target.value) {
        setShowExerciseAddBtn(true);
      } else {
        setShowExerciseAddBtn(false);
      }
    };

    return (
      <div className="flex bg-red-900 justify-between">
        <label>Exercise name:</label>
        <input type="text" onKeyUp={addAddExerciceButton} />
        {showExerciseAddBtn && (
          <button
            className={`bg-red-500 px-1 ${
              showExerciseAddBtn ? "opacity" : "0"
            }`}
          >
            Add
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-red-300 w-96 h-96 m-auto">
      <button
        className="bg-red-500 py-2 px-4 rounded-3xl"
        onClick={handleAddTemplateClick}
      >
        Add template
      </button>
      {showTemplate && <div>{renderAddExerciseInput()}</div>}
    </div>
  );
};

export default Exercises;

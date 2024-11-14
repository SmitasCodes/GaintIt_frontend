import React, { useEffect, useState } from "react";
import axios from "axios";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);

  const handleAddTemplateClick = () => {
    setShowTemplate(!showTemplate);
  };

  const renderAddExerciseInput = () => {
    return (
      <div>
        <label>Exercise name:</label>
        <input type="text" />
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
      {showTemplate && (
        <div>
          <form>
            <button
              className="bg-red-500 py-2 px-4 rounded-3xl"
              onClick={renderAddExerciseInput()}
            >
              Add exercise
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Exercises;

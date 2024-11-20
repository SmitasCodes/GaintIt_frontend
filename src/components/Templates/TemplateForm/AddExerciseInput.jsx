import React, { useState } from "react";

const AddExerciseInput = ({ getInput }) => {
  const [showExerciseAddBtn, setShowExerciseAddBtn] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addExerciceButton = (e) => {
    if (e.target.value) {
      setShowExerciseAddBtn(true);
    } else {
      setShowExerciseAddBtn(false);
    }
  };

  const addExerciseButtonHandler = (e) => {
    e.preventDefault();
    if (!inputValue) {
      console.log("Please enter exercise name");
      return;
    }
    getInput(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex justify-between pb-2">
      <label>Exercise name:</label>
      <input
        type="text"
        onChange={addExerciceButton}
        value={inputValue}
        onChangeCapture={(e) => setInputValue(e.target.value)}
      />
      <button
        className={`bg-red-500 px-1 inline ${
          showExerciseAddBtn ? "opacity-1" : "opacity-0"
        }`}
        onClick={addExerciseButtonHandler}
      >
        Add
      </button>
    </div>
  );
};

export default AddExerciseInput;

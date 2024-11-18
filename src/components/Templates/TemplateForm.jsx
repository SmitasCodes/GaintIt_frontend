import React, { useRef, useState } from "react";

const TemplateForm = () => {
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
    <>
      <form className="flex justify-between w-96  bg-red-900">
        <label>Exercise name:</label>
        <input type="text" onChange={addExerciceButton} ref={inputRef} />
        <button
          className={`bg-red-500 px-1 inline ${
            showExerciseAddBtn ? "opacity-1" : "opacity-0"
          }`}
        >
          Add
        </button>
      </form>
    </>
  );
};

export default TemplateForm;

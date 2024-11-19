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
      <form className="bg-red-900 px-2 relative">
        <div className="flex justify-between">
          <label>Exercise name:</label>
          <input type="text" onChange={addExerciceButton} ref={inputRef} />
          <button
            className={`bg-red-500 px-1 inline ${
              showExerciseAddBtn ? "opacity-1" : "opacity-0"
            }`}
          >
            Add
          </button>
        </div>
        <button type="submit" className="inline-block bg-red-400 px-2 py-1 rounded-xl text-base">Submit template</button>
      </form>
    </>
  );
};

export default TemplateForm;

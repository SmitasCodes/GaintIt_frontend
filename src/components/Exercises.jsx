import React, { useEffect, useState } from "react";
import axios from "axios";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showExerciseAddBtn, setShowExerciseAddBtn] = useState(false);

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = () => {
    axios
      .get(
        "http://localhost:8787/api/workout-template/6735d7699ebaa1f74f6a19e5/exercises",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjkzZDkzMWQ1YzgxZDE4NzM3ZGUwNSIsImlhdCI6MTczMDkwMjExMSwiZXhwIjoxNzMzNDk0MTExfQ.pwyD88jbQQX6aEoOsHp6qUKBYS-X2DZhso1ey44HrEw",
          },
        }
      )
      .then((res) => {
        const exercises = res.data.exercises;
        setExercises(exercises);

        console.log(exercises);
      });
  };

  const handleAddTemplateClick = () => {
    setShowTemplate(!showTemplate);
  };

  const renderAddExerciseInput = () => {
    const addExerciceButton = (e) => {
      if (e.target.value) {
        console.log("ss");
        setShowExerciseAddBtn(true);
      } else {
        setShowExerciseAddBtn(false);
      }
    };

    return (
      <div className="flex bg-red-900 justify-between">
        <label>Exercise name:</label>
        <input type="text" onKeyUp={addExerciceButton} />
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

  const renderExercisesList = () => {};

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
          {renderExercisesList}
          {renderAddExerciseInput()}
        </div>
      )}
    </div>
  );
};

export default Exercises;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { list } from "postcss";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showExerciseAddBtn, setShowExerciseAddBtn] = useState(false);

  useEffect(() => {
    getExercisesService();
  }, []);

  const getExercisesService = () => {
    axios
      .get(
        "http://localhost:8787/api/workout-template/6735d7699ebaa1f74e6a19e5/exercises",
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
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
  };

  const addExerciseService = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  const handleAddTemplateClick = () => {
    setShowTemplate(!showTemplate);
  };

  const renderAddExerciseInput = () => {
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
        <input type="text" onChange={addExerciceButton} />
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

  const renderExercisesList = () => {
    return (
      <div>
        <h3 className="font-black bg-red-600">Current exercises</h3>
        <ul>
          {exercises.map((exercise) => {
            return <li>{exercise.exercise_name}</li>;
          })}
        </ul>
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
          {renderExercisesList()}
          <form onSubmit={addExerciseService()}>
            {renderAddExerciseInput()}
          </form>
        </div>
      )}
    </div>
  );
};

export default Exercises;

import React, { useEffect, useState, useRef } from "react";
import { getExercisesService } from "../services/templateServices";
import AddTemplate from "./AddTemplate";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercises = await getExercisesService();
        setExercises(exercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const addExercise = (event) => {
    event.preventDefault();
    renderAddExerciseInput();
  };

  const handleAddTemplateClick = () => {
    setShowTemplate(!showTemplate);
  };

  const renderExercisesList = () => {
    if (exercises.length === 0) {
      return <p>No exercises available.</p>;
    }

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
      {showTemplate && <AddTemplate />}
    </div>
  );
};

export default Exercises;

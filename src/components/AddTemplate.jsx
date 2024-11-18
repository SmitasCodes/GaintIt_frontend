import React from "react";

const AddTemplate = () => {
  return (
    <div>
      {renderExercisesList()}
      <form onSubmit={addExercise}>
        <ExercisesInput />
      </form>
    </div>
  );
};

export default AddTemplate;

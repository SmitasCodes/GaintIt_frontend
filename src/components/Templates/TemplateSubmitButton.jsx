import React from "react";

const TemplateSubmitButton = ({buttonText, clickFunction}) => {
  return (
    <div>
      <div className="h-10 w-full absolute bottom-0 transform bg-red-300 flex justify-center items-center rounded-b-xl">
        <button
          className="px-4 py-1 bg-red-500 rounded-2xl"
          onClick={clickFunction}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TemplateSubmitButton;

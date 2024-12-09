import React from "react";
import Button from "../Button";

const TemplateSubmitWrapper = ({ buttonText, clickFunction }) => {
  return (
    <div className="h-10 w-full absolute bottom-0 transform bg-red-300 flex justify-center items-center rounded-b-xl">
      <Button
        style="px-4 py-1 bg-red-500 rounded-2xl"
        onClick={clickFunction}
        text={buttonText}
      />
    </div>
  );
};

export default TemplateSubmitWrapper;

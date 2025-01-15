import React from "react";
import Button from "../Button";

const TemplateSubmitWrapper = ({ buttonText, clickFunction }) => {
  return (
    <div className="h-10 w-full absolute bottom-0 transform flex justify-center items-center rounded-b-xl">
      <Button
        style="px-4 py-1 bg-accent rounded-2xl"
        onClick={clickFunction}
        text={buttonText}
      />
    </div>
  );
};

export default TemplateSubmitWrapper;

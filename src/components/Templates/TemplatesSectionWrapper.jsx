import React from "react";

const TemplatesSectionWrapper = ({ children }) => {
  return (
    <div className="flex-grow rounded-xl bg-neutral  overflow-y-scroll scrollbar-thin scrollbar-thumb-accent scrollbar-track-secondary h-full">
      {children}
    </div>
  );
};

export default TemplatesSectionWrapper;

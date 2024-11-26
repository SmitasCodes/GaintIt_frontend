import React from "react";
import Input from "./Input";
import Button from "./Button";

const Form = ({ fields, onSubmit, buttons }) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, index) => {
        return (
          <div className="pb-2" key={index}>
            <label className={field.labelStyle}>{field.label}</label>
            <Input
              style={field.style}
              value={field.value}
              type={field.type}
              onChange={field.onChange}
              autocomplete={field.autocomplete}
            />
          </div>
        );
      })}
      {buttons.map((button, index) => {
        return (
          <Button
            key={index}
            style={button.style}
            text={button.text}
            type={button.type}
          />
        );
      })}
    </form>
  );
};

export default Form;

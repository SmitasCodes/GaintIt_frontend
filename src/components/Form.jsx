import React from "react";
import Input from "./Input";
import Button from "./Button";

const Form = ({
  fields,
  onSubmit,
  button,
  demoButton,
  error,
  title,
  style,
  navigationAnchor,
}) => {
  return (
    <form onSubmit={onSubmit} className={style}>
      <h2 className={title.style}>{title.title}</h2>
      {fields.map((field, index) => {
        return (
          <div className="pb-2" key={index}>
            <label className={field.labelStyle} htmlFor={`input-${index}`}>
              {field.label}
            </label>
            <Input
              id={`input-${index}`}
              style={field.style}
              value={field.value}
              type={field.type}
              onChange={field.onChange}
              autocomplete={field.autocomplete}
            />
          </div>
        );
      })}

      {error ? <p className="text-red-500">{error}</p> : ""}

      <div className="flex justify-around mt-2">
        <Button style={button.style} text={button.text} type={button.type} />
        <a href={navigationAnchor.href} className={navigationAnchor.style}>
          {navigationAnchor.text}
        </a>
      </div>

      <div className="flex items-center my-2">
        <div className="flex-grow border-t border-gray-500"></div>
        <span className="px-4 text-gray-800 text-sm">or</span>
        <div className="flex-grow border-t border-gray-500"></div>
      </div>

      <Button
        style={demoButton.style}
        text={demoButton.text}
        type={demoButton.type}
        onClick={demoButton.onClick}
      />
    </form>
  );
};

export default Form;

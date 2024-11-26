import React from "react";

const Input = ({ style, onChange, value, type, autocomplete }) => {
  return (
    <input className={style} onChange={onChange} value={value} type={type} autoComplete={autocomplete} />
  );
};

export default Input;

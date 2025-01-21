import React from "react";

const Button = ({ style, text, type = "button", onClick, span }) => {
  return (
    <button className={style} type={type} onClick={onClick}>
      {text}
      {span}
    </button>
  );
};

export default Button;

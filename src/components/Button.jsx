import React from "react";

const Button = ({ style, text, type, onClick }) => {
  return <button className={style} type={type} onClick={onClick}>{text}</button>;
};

export default Button;

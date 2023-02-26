import React from "react";

// const buttonTypes = {
//   primary: "primary",
//   secondary: "secondary",
// };

const Button = ({ children, type, ...rest }) => {
  return (
    <button
      className="button button--primary"
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, id,  ...rest }) => {
  return (
    <select {...rest} className="button button__select" name="" id={id}>
      {children}
    </select>
  );
};
export {Button, SelectButton };

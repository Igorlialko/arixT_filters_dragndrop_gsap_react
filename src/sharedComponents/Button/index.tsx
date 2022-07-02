import React, {FC, ReactNode} from "react";
import "./index.scss";

type PButton = {
    className?: string,
    onClick: ([x]: any) => void,
    children?: ReactNode,
}

const Button: FC<PButton> = ({children, className, onClick, ...args}) => {

  const handleClick = (e: any) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <button className={`button ${className}`}
      onClick={handleClick}
      {...args}>
      {children}
    </button>
  );
};

export default Button;
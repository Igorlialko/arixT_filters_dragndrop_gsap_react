import React, {FC, ReactNode} from "react";
import "./index.scss";

type Props={
    className?: string,
    active?: boolean,
    onClick?: ([x]:any) => void,
    children?: ReactNode,
}

export const CustomCheckbox:FC<Props> = ({
  children,
  className,
  onClick,
  active
}) => {
  return (
    <button onClick={onClick} className={`custom-checkbox ${className} ${active?"active":""}`} >
      {children}
    </button>
  );
};
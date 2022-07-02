import React, {ChangeEvent, FC} from "react";
import "./index.scss";

type InputProps = {
    className?: string,
    value: string,
    placeholder: string,
    onChange: ([x]: any) => void,
}

const Input: FC<InputProps> = ({placeholder,value, onChange, className, ...arg}) => {

  const change = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <input value={value}
      type="text"
      onChange={change}
      placeholder={placeholder}
      className={`standard-input ${className}`}
      {...arg} />
  );
};

export default Input;
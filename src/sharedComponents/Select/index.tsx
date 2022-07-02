import React, {FC, useCallback, useState} from "react";
import "./index.scss";

type Props = {
    options: string[],
    select: string,
    setSelect: ([x]: any) => void,
    className?:string,
}

export const Select: FC<Props> = ({options, select, setSelect,className}) => {
  const [active, setActive] = useState(false);
  const optionClick = useCallback((e: any) => setSelect(e.target.innerHTML), [setSelect]);
  const selectClick = useCallback(() => setActive(prev => !prev), [setActive]);

  return (
    <div className={`${className} select ${active ? "active" : ""}`}
      onClick={selectClick}
    >
      <div className={"select__head"}>
        {select}
      </div>
      <div className={"select__option_container"}>
        {options.map((option) =>
          <div className={`select__option ${select === option ? "active" : ""}`}
            key={option}
            onClick={optionClick}
          >
            {option}
          </div>
        )}
      </div>
    </div>
  );
};
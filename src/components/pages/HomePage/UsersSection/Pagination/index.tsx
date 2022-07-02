import React, {FC, useEffect, useRef} from "react";

import {CustomCheckbox} from "../../../../../sharedComponents/CustomCheckbox";
import {Select} from "../../../../../sharedComponents/Select";
import {gsapFromTo} from "../../../../../helpers/functions/gsap";

type Props = {
    pagArr: number[],
    activePag: number,
    handleActive: ([x]: any) => () => void,
    isAllPages: boolean,
    handleNext: ([x]: any) => void,
    handleSelect: ([x]: any) => void,
    options: string[],
    select: string,
}

export const Pagination: FC<Props> = ({
  pagArr,
  activePag,
  handleActive,
  isAllPages,
  handleNext,
  options,
  select,
  handleSelect
}) => {
  const pages = useRef<any>(null);
  useEffect(() => {
    if (!pages.current) return;
    gsapFromTo(pages.current.children[pages.current.children.length - 2], {scale: 0.6,}, {scale: 1, duration: 0.3});
  }, [pages, pagArr]);
  return (
    <div className="users__list-pagination pagination">
      <div className="pagination-pages" ref={pages}>
        {
          pagArr.map((el) => <CustomCheckbox
            key={el}
            active={el === activePag}
            onClick={handleActive(el)}
            className={`pagination-page ${el === activePag ? "disable" : ""}`}
          >
            <span>{el}</span>
          </CustomCheckbox>)
        }
        <CustomCheckbox
          className={`pagination-next ${isAllPages ? "disable" : ""}`}
          onClick={handleNext}
        ><span>{isAllPages ? "All pages" : "Next page >"}</span></CustomCheckbox>
      </div>
      <div className="pagination-limit">
        <Select options={options}
          select={select}
          setSelect={handleSelect}
          className="pagination-select"
        />
      </div>
    </div>
  );
};


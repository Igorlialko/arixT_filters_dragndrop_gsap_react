import React, {FC, useEffect, useRef} from "react";

import "./index.scss";

import Input from "../../../../../sharedComponents/Input";
import {DoubleSlider} from "../../../../../sharedComponents/DoubleSlider";
import {CustomCheckbox} from "../../../../../sharedComponents/CustomCheckbox";
import {Select} from "../../../../../sharedComponents/Select";
import { fadeIn } from "../../../../../helpers/functions/gsap";

type Props = {
    search: string,
    setSearch: ([x]: any) => void,
    handleAgeValue: ([x]: any) => void,
    minAge: number,
    maxAge: number,
    male: boolean,
    handleSetMale: ([x]: any) => void,
    female: boolean,
    handleSetFemale: ([x]: any) => void,
    options: string[],
    select: string,
    setSelect: ([x]: any) => void
}

export const Filters: FC<Props> = ({
  search,
  setSearch,
  handleAgeValue,
  minAge,
  maxAge,
  male,
  handleSetMale,
  female,
  handleSetFemale,
  options,
  select,
  setSelect
}) => {
  const filters = useRef<any>(null);
  useEffect(() => {
    if (!filters.current) return;
    fadeIn(filters.current.querySelectorAll(".filter-block__container"));
  }, [filters]);

  return (
    <div className="filter-block" ref={filters}>
      <div className="filter-block__container">
        <h3 className="filter-block__mb7">Name</h3>
        <Input placeholder="Search by name" value={search} onChange={setSearch}/>
      </div>

      <div className="filter-block__container">
        <h3 className="filter-block__age">Age</h3>
        <DoubleSlider
          maxStart={99}
          min={1}
          max={99}
          onChange={handleAgeValue}
        />
        <div className="filter-block__age-minmax">
          {minAge} - {maxAge}
        </div>
      </div>

      <div className="filter-block__container">
        <h3 className="filter-block__mb7">Gender</h3>
        <CustomCheckbox
          active={male}
          onClick={handleSetMale}
          className="filter-block__male"
        >
                    Male
        </CustomCheckbox>
        <CustomCheckbox
          active={female}
          onClick={handleSetFemale}
        >
                    Female
        </CustomCheckbox>
      </div>

      <div className="filter-block__container">
        <h3 className="filter-block__mb7">Sort By</h3>
        <Select options={options}
          select={select}
          setSelect={setSelect}/>
      </div>

    </div>
  );
};


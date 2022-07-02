import {useCallback, useState} from "react";


export default function useFilters() {
  const sortOptions = ["select please", "name", "date of birth", "city", "custom sort"];

  const [search, setSearch] = useState("");
  const [minAge, setMinAge] = useState(1);
  const [maxAge, setMaxAge] = useState(99);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]);
  //sort
  const handleSort = useCallback((value: string) => {
    setSort(value);
  }, [setSort]);
  //search
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, [setSearch]);
  //male
  const handleSetMale = useCallback(() => {
    setMale(prev => !prev);
    if (female) setFemale(false);
  }, [female, setMale, setFemale]);

  const handleSetFemale = useCallback(() => {
    setFemale(prev => !prev);
    if (male) setMale(false);
  }, [male, setMale, setFemale]);

  const handleAgeValue = useCallback((ageVal: any) => {
    setMinAge(ageVal.min);
    setMaxAge(ageVal.max);
  }, [setMinAge, setMaxAge]);

  return {
    handleAgeValue,handleSetFemale,
    handleSetMale,handleSearch,
    handleSort,sort,search,
    female,male,maxAge,minAge,
    sortOptions
  };
};
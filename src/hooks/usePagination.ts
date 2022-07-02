import {useCallback, useMemo, useState} from "react";

import {COUNT_ALL_USERS, DURATION_DO_SCROLL} from "../helpers/const";
import doScroll from "../helpers/functions/doScroll";


export default function usePagination(usersRef:any) {
  const options = useMemo(() => ["10", "50", "100", "all"], []);
  const [pagArr, setPagArr] = useState([1]);
  const [activePag, setActivePag] = useState(1);
  const [select, setSelect] = useState(options[1]);
  const limitOption = useMemo(() => {
    switch (select) {
    case "10":
      return 10;
    case "50":
      return 50;
    case "100":
      return 100;
    case "all":
      return COUNT_ALL_USERS;
    default:
      return 50;
    }
  }, [select]);

  //hendlers pagination
  const handleSelect = useCallback(async (val: string) => {
    setSelect(val);
    setPagArr([1]);
    setActivePag(1);
    await setTimeout(() => doScroll(usersRef.current, DURATION_DO_SCROLL), 0);
  }, [setSelect, setPagArr,usersRef]);

  const handleActive = useCallback((num: number) => async () => {
    setActivePag(num);
    await setTimeout(() => doScroll(usersRef.current, DURATION_DO_SCROLL), 0);
  }, [setActivePag,usersRef]);

  const handleNext = useCallback(() => setPagArr(prev => [...prev, prev[prev.length - 1] + 1]), [setPagArr]);

  return {
    options,
    handleNext, handleActive,
    handleSelect, limitOption,
    select, activePag,
    pagArr, setPagArr, setActivePag
  };

}
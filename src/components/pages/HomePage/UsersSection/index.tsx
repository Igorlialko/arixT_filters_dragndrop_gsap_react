import React, {useCallback, useEffect, useMemo, useRef} from "react";

import "./index.scss";

import {useTypedDispatch, useTypedSelector} from "../../../../hooks/useTypedRedux";
import {selectUsersPagination} from "../../../../store/selectors/usersSelectors";
import {COUNT_ALL_USERS} from "../../../../helpers/const";
import useDebounce from "../../../../helpers/hooks/useDebounce";
import {
  setFilteredUsers, setIsLoadingFilters,
} from "../../../../store/reducers/userReducer";
import usePagination from "../../../../hooks/usePagination";
import useFilters from "../../../../hooks/useFilters";
import Preloader from "../../../Preloader";
import ArrowDown from "../../../../assets/icons/ArrowDown";
import ArrowUp from "../../../../assets/icons/ArrowUp";
import useReverse from "../../../../hooks/useReverse";

import {Pagination} from "./Pagination";
import {Filters} from "./Filters";
import {UsersList} from "./UsersList";

export const UsersSection = () => {
  const usersRef = useRef(null);
  const dispatch = useTypedDispatch();

  const {
    options,
    handleNext, handleActive,
    handleSelect, limitOption,
    select, activePag,
    pagArr, setPagArr, setActivePag
  } = usePagination(usersRef);

  const {
    handleAgeValue, handleSetFemale,
    handleSetMale, handleSearch,
    handleSort, sort, search,
    female, male, maxAge, minAge,
    sortOptions
  } = useFilters();

  //reverse
  const {
    reverse, isActiveReverse,
    reverseUp, reverseDown
  } = useReverse(sort);

  //start filters
  const filteredUsersLength = useTypedSelector(state => state.userReducer.filteredUsers.length);
  const isLoadingFilters = useTypedSelector(state => state.userReducer.isLoadingFilters);

  const debounceFiltration = useDebounce(useCallback((search: string, sort: string,
    female: boolean, male: boolean,
    minAge: number, maxAge: number, reverse: boolean) => {
    dispatch(setFilteredUsers({
      search, sort,
      female, male,
      minAge, maxAge,
      reverse
    }));
    setPagArr([1]);
    setActivePag(1);
  }, [setPagArr, setActivePag, dispatch]), 1000);

  useEffect(() => {
    dispatch(setIsLoadingFilters(true));
    debounceFiltration(search, sort,
      female, male,
      minAge, maxAge, reverse);
  }, [debounceFiltration, dispatch,
    search, sort,
    female, male,
    minAge, maxAge, reverse]);

  //get users
  /* eslint-disable */
    const selectorAction = useCallback(selectUsersPagination(activePag, limitOption), [activePag, limitOption]);
    /* eslint-enable */
  const users = useTypedSelector(selectorAction);

  const isAllPages = useMemo(() => {
    if (filteredUsersLength) {
      return pagArr[pagArr.length - 1] === Math.ceil(filteredUsersLength / limitOption);
    }
    return pagArr[pagArr.length - 1] === (COUNT_ALL_USERS / limitOption);
  },
  [pagArr, limitOption, filteredUsersLength]);

  const isFilteredNull = useMemo(() => {
    return !filteredUsersLength && (
      search ||
            female ||
            male ||
            minAge > 1 ||
            maxAge < 99
    );
  }, [
    search,
    female, male,
    minAge, maxAge,
    filteredUsersLength]);

  return (
    <section className="users">
      <div className="users__container _container">
        <div className="users__filters">
          <h1 className="users__title">Filter</h1>
          <Filters options={sortOptions}
            female={female}
            handleAgeValue={handleAgeValue}
            handleSetFemale={handleSetFemale}
            handleSetMale={handleSetMale}
            male={male}
            maxAge={maxAge}
            minAge={minAge}
            search={search}
            setSearch={handleSearch}
            select={sort}
            setSelect={handleSort}
          />
        </div>
        <div className="users__list" ref={usersRef}>
          <h1 className="users__title">
                        List of users
            <div className={`users__title-reverse ${isActiveReverse ? "active" : ""}`}>
              <ArrowDown
                className={`users__title-reverse__arrow ${isActiveReverse && !reverse ? "active" : ""}`}
                onClick={reverseDown}
              />
              <ArrowUp
                className={`users__title-reverse__arrow  ${isActiveReverse && reverse ? "active" : ""}`}
                onClick={reverseUp}
              />
            </div>
          </h1>
          {isLoadingFilters ? <Preloader/> :
            isFilteredNull ? <h2>-"no results"-</h2> :
              <>
                <UsersList users={users} isActiveDrag={sort === "custom sort" && users.length > 1}/>
                <Pagination select={select}
                  options={options}
                  activePag={activePag}
                  handleActive={handleActive}
                  handleNext={handleNext}
                  handleSelect={handleSelect}
                  isAllPages={isAllPages}
                  pagArr={pagArr}/>
              </>
          }
        </div>
      </div>
    </section>
  );
};



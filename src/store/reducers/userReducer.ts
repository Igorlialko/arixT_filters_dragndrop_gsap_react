import {createSlice} from "@reduxjs/toolkit";

import {IUserLocale} from "../../types/users";
import {binarySearch} from "../../helpers/functions/binarySearch";

interface IInitialState {
    users: IUserLocale[]|any,
    filteredUsers: IUserLocale[],
    isLoadingFilters: boolean,
}

const initialState: IInitialState = {
  users: [],
  filteredUsers: [],
  isLoadingFilters: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, {payload}) {
      state.users = payload;
    },
    removeUser(state, {payload}) {
      state.users = state.users.filter((user:IUserLocale) => user.id !== payload);
    },
    setIsLoadingFilters(state, {payload}) {
      state.isLoadingFilters = payload;
    },
    setFilteredUsers(state, {payload}) {
      const {
        search, sort,
        female, male,
        minAge, maxAge
      } = payload;

      let stack: any = [];
      const filterArray = state.users;

      const filtration = (fn: ([x]: any) => void, rulers: boolean) => {
        if (!stack.length && rulers) {
          stack = filterArray.filter((el: any) => {
            return fn(el);
          });
        } else {
          stack = stack.filter((el: any) => {
            return fn(el);
          });
        }
      };

      if (search.length) {
        const tactic = (elem: IUserLocale) => {
          const str = Object.values(elem).reduce((acc: string, el: any, i) => (i !== 4 && i !== 6) ? (acc + el) : acc, "");
          return str.includes(search);
        };
        filtration(tactic, true);
      }
      if (minAge !== 1 || maxAge !== 99) {
        const tactic = (elem: IUserLocale) => elem.age >= minAge && elem.age <= maxAge;
        filtration(tactic, !search.length);
      }
      if (male || female) {
        const gender = male ? "male" : "female";
        const tactic = (elem: IUserLocale) => elem.gender === gender;
        filtration(tactic, !search.length && minAge === 1 && maxAge === 99);
      }

      const sortingArrString = (sort: string) => {
        const tactic = (a: any, b: any) => {
          if (a[sort] > b[sort]) {
            return 1;
          }
          if (a[sort] < b[sort]) {
            return -1;
          }
          return 0;
        };
        if (!stack.length && !search.length && !male && !female && minAge === 1 && maxAge === 99) {
          stack = filterArray.sort(tactic);
        } else {
          stack = stack.sort(tactic);
        }
      };

      switch (sort) {
      case "name":
        sortingArrString("name");
        break;
      case "date of birth":
        sortingArrString("dateOfBirth");
        break;
      case "city":
        sortingArrString("position");
        break;
      }
      state.filteredUsers = stack;
      state.isLoadingFilters = false;
    },
    editUser(state, {payload}) {
      const index = binarySearch(state.users, payload.id, "id");
      state.users[index][payload.target] = payload.value;
    },
  },
});

export default userSlice.reducer;
export const {
  setUsers,
  removeUser,
  setFilteredUsers,
  setIsLoadingFilters,
  editUser
} = userSlice.actions;
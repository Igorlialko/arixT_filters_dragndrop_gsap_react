import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {dataTransform} from "../../helpers/functions/dataTransform";
import {IUser, IUserLocale} from "../../types/users";

import {getBuilder} from "./apiBuilder";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "https://randomuser.me/api",
  }),
  endpoints(build) {
    return {
      getUsers: build.query({
        query: ({all = 500}) =>
          getBuilder(`/?page=1&results=${all}`),
        transformResponse: (rawResult: { results: IUser[] }) =>
          rawResult.results.reduce((acc: any | IUserLocale[], el) => {
            return [...acc, {
              age: el.dob.age,
              gender: el.gender,
              email: el.email,
              name: `${el.name.first} ${el.name.last}`,
              dateOfBirth: dataTransform(el.dob.date),
              photo: el.picture.medium,
              position: `${el.location.city},${el.location.street.name} ${el.location.street.number}`,
              id: el.login.uuid
            }];
          }, []).sort((a: IUserLocale, b: IUserLocale) => {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          }
          ),
      }),
    };
  },
});

export const {
  useGetUsersQuery
} = usersApi;
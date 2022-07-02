import {useMemo} from "react";

import {editUser} from "../store/reducers/userReducer";

import {useTypedDispatch} from "./useTypedRedux";


export default function useInputEdit(id: string) {
  const dispatch = useTypedDispatch();

  const targetArray = useMemo(() => [
    {
      target: "name",
      valid(value: string) {
        if (!value) {
          return "Cannot be blank";
        } else if (value.length < 2 || value.length > 60) {
          return "Username should contain 2-60 characters";
        }
        return false;
      }
    },
    {
      target: "email",
      valid(value: string) {
        /* eslint-disable */
                const regexEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
                /* eslint-enable */
        if (!value) {
          return "Cannot be blank";
        } else if (!regexEmail.test(value)) {
          return "User email, must be a valid email according to RFC2822";
        }
        return false;
      }
    },
    {
      target: "position",
      valid(value: string) {
        if (!value) {
          return "Cannot be blank";
        } else if (value.length < 2 || value.length > 60) {
          return "City should contain 2-60 characters";
        }
        return false;
      }
    },
    {
      target: "dateOfBirth",
      valid(value: string) {
        const monthArr = [
          "January", "February",
          "March", "April",
          "May", "June",
          "July", "August",
          "September", "October",
          "November", "December"
        ];
        const year = new Date().getFullYear();

        const ruler = (+value.slice(0, 2) >= 1 && +value.slice(0, 2) <= 31) &&
                    (value.slice(2, 3) === " ") &&
                    (monthArr.includes(value.slice(3, value.length - 5))) &&
                    (value.slice(value.length - 5, value.length - 4) === " ") &&
                    (+value.slice(value.length - 4, value.length) < year) &&
                    (+value.slice(value.length - 4, value.length) > (year - 98));

        if (!value) {
          return "Cannot be blank";
        } else if (!ruler) {
          return "must be format: 01 January 1990";
        }
        return false;
      }
    }
  ], []);

  const handle: any = useMemo(() => ({
    edit(target: string, value: string) {
      dispatch(editUser({
        id,
        value,
        target,
      }));
    },
    name(value: string) {
      handle.edit("name", value);
    },
    email(value: string) {
      handle.edit("email", value);
    },
    position(value: string) {
      handle.edit("position", value);
    },
    dateOfBirth(value: string) {
      handle.edit("dateOfBirth", value);
    },
  }), [dispatch, id]);

  return {targetArray, handle};
}
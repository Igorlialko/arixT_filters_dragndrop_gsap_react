import {TypeRootState} from "../store";
import {binarySearch} from "../../helpers/functions/binarySearch";

export const selectUsersPagination = (page = 1, limit: number) => {
  return (state: TypeRootState) => {
    const users = [];
    const filterLength = state.userReducer.filteredUsers.length;
    if (filterLength) {
      for (let i = 0; i < Math.min(limit, filterLength - (page - 1) * limit); i++) {
        users.push({
          ...state.userReducer.filteredUsers[(i === 0 && page > 1) ? ((page - 1) * limit + 1) : page * i]
        });
      }
    } else {
      const usersLength=state.userReducer.users.length;
      for (let i = 0; i < Math.min(limit, usersLength - (page - 1) * limit); i++) {
        users.push({
          ...state.userReducer.users[(i === 0 && page > 1) ? ((page - 1) * limit + 1) : page * i]
        });
      }
    }
    return users;
  };
};

export const selectUser = (id: string) => (state: TypeRootState) => {
  const index = binarySearch(state.userReducer.users, id, "id");
  return state.userReducer.users[index];
};

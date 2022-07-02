import React, {FC, useEffect, useRef} from "react";

import {IUserLocale} from "../../../../../types/users";
import UserCard from "../../../../../sharedComponents/UserCard";
import {initDrag} from "../../../../../helpers/functions/gsap";
import { DURATION_DO_SCROLL } from "../../../../../helpers/const";
import {ScrolltrigerUsers} from "../../../../../helpers/functions/gsap";

type Props = {
    users: IUserLocale[],
    isActiveDrag: boolean
}

export const UsersList: FC<Props> = ({users, isActiveDrag}) => {
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current.children.length) return;
    const el = containerRef.current;
    setTimeout(()=>{
      ScrolltrigerUsers(el);
    },DURATION_DO_SCROLL);
  }, [users, containerRef]);

  useEffect(() => {
    isActiveDrag && initDrag(containerRef);
  }, [users, isActiveDrag]);


  return (
    <div className={`users__list-main ${isActiveDrag ? "isActiveDrag" : ""}`}
      ref={containerRef}
      style={{
        height: isActiveDrag ? `${users.length * 139}px` : "unset"
      }}
    >
      {
        users.map((el: IUserLocale, index) =>
          <div key={el.id + "_" + index}
            className={`users__list-main__box  ${isActiveDrag ? "users__list-main__drag" : ""}`}
          >
            <UserCard email={el.email}
              name={el.name}
              dateOfBirth={el.dateOfBirth}
              photo={el.photo}
              position={el.position}
              id={el.id}
              isActiveDrag={isActiveDrag}
            />
          </div>
        )
      }
    </div>
  );
};


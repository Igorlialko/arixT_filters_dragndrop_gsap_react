import React, {useCallback, useEffect, useRef} from "react";

import "./index.scss";
import {useNavigate, useParams} from "react-router-dom";

import Button from "../../../../sharedComponents/Button";
import {useTypedDispatch, useTypedSelector} from "../../../../hooks/useTypedRedux";
import {selectUser} from "../../../../store/selectors/usersSelectors";
import Preloader from "../../../Preloader";
import {InputEdit} from "../../../../sharedComponents/InputEdit";
import {removeUser} from "../../../../store/reducers/userReducer";
import useInputEdit from "../../../../hooks/useInputEdit";
import {gsapFromTo} from "../../../../helpers/functions/gsap";

export const EditUserSection = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const userByID = useTypedSelector(selectUser(`${id}`));
  useEffect(() => {
    // if (!userByID) {
    //   navigate("/");
    // }
  }, [userByID, navigate]);

  // add in ref, because, don`t like moment changes,so it`s pretty
  const user = useRef({...userByID});
  //gsap
  const inputs = useRef<any>(null);
  const profile = useRef<any>(null);
  useEffect(() => {
    if (!inputs.current) return;
    gsapFromTo(inputs.current.children, {scale: 0.9, top: 100}, {scale: 1, top: 0});
  }, [inputs]);
  useEffect(() => {
    if (!profile.current) return;
    gsapFromTo(profile.current.children, {scale: 0.9, y: -50}, {scale: 1, y: 0});
  }, [profile]);
  //validation,events
  const {targetArray, handle} = useInputEdit(`${id}`);

  const dispatch = useTypedDispatch();

  const deleteUser = useCallback(() => {
    dispatch(removeUser(id));
    navigate("/");
  }, [dispatch, id, navigate]);

  if (userByID) {
    return (
      <section className="edit-user">
        <div className="edit-user__container _container">
          <form action=""
            className="edit-user__form"
          >
            <div className="edit-user__form-profile"
              ref={profile}
            >
              <Button className="edit-user__btn" onClick={() => {
                navigate("/");
              }}>
                <span>{"< Back"}</span>
              </Button>

              <div className="edit-user__form-img">
                <img src={user.current.photo} alt={user.current.name}/>
              </div>
              <h1>{user.current.name}</h1>
              <h3 className="edit-user__form-date">{user.current.dateOfBirth}</h3>
              <Button className="edit-user__delete"
                onClick={deleteUser}>
                <span>Delete</span>
              </Button>
            </div>
            <div className="edit-user__form-inputs"
              ref={inputs}
            >
              {
                targetArray.map((el) =>
                  <InputEdit
                    key={el.target}
                    valid={el.valid}
                    placeholder={user.current[el.target]}
                    onUpdate={handle[el.target]}
                  />
                )
              }
            </div>
          </form>
        </div>
      </section>
    );
  } else return <Preloader/>;
};



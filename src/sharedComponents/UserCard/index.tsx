import React, {FC, useEffect, useRef, useState} from "react";

import "./index.scss";
import {useNavigate} from "react-router-dom";

import Tooltip from "../Tooltip";
import Image from "../Image";
import {replaceString} from "../../helpers/functions/replaceString";
import Button from "../Button";

type Props = {
    email: string,
    name: string,
    dateOfBirth: string,
    photo: string,
    position: string,
    id: string,
    isActiveDrag: boolean
}

const UserCard: FC<Props> = ({isActiveDrag, email, name, dateOfBirth, photo, position, id}) => {
  const [validEmail, setValidEmail] = useState(email);
  const [validName, setValidName] = useState(name);
  const [validDateOfBirth, setValidDateOfBirth] = useState(dateOfBirth);
  const [validPosition, setValidPosition] = useState(position);
  const container = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (container) {
      [
        {setter: setValidName, el: container.current?.children[0],},
        {setter: setValidPosition, el: container.current?.children[2],},
        {setter: setValidEmail, el: container.current?.children[3],},
        {setter: setValidDateOfBirth, el: container.current?.children[1],},
      ].forEach(({el, setter}) => {
        if (el.offsetWidth > 200) replaceString(el, 200, setter);
      });
    }
  }, [container]);

  const description =  [
    {
      valid: <h2 key={validName + "12324tegtdb"}>
        {validName}
      </h2>,
      validate: validName,
      value: name
    },
    {
      valid: <h3 key={validDateOfBirth + "aefgrstnb"}>
        {validDateOfBirth}
      </h3>,
      validate: validDateOfBirth,
      value: dateOfBirth
    },
    {
      valid: <div key={validPosition + "sarestn gw"} className="user-card__description-title">
        {validPosition}
      </div>,
      validate: validPosition,
      value: position
    },
    {
      valid: <div key={validEmail + "sarstnfdz gerdf"} className="user-card__description-title">
        {validEmail}
      </div>,
      validate: validEmail,
      value: email
    },
  ];

  return (
    <article className="user-card" draggable={`${isActiveDrag}`}>
      <div className="user-card__container">
        <div className="user-card__img">
          <Image src={photo} alt="user"/>
        </div>
        <div className="user-card__description" ref={container}>
          {description.map(({valid, validate, value}, index) => {
            return validate !== value
              ? <Tooltip key={id + validate + index} content={value}>
                {valid}
              </Tooltip>
              : valid;
          })
          }
        </div>
        <Button className="user-card__Btn" onClick={() => {
          navigate(`${id}`);
        }}>
          <span className="user-card__spanBtn">Edit</span>
        </Button>

      </div>
    </article>
  );
};

export default UserCard;
import React, {ChangeEvent, FC, useCallback, useMemo, useState} from "react";
import "./index.scss";

type InputProps = {
    placeholder: string,
    onUpdate: ([x]: any) => void,
    valid: ([x]: any) => string | false
}

export const InputEdit: FC<InputProps> = ({placeholder, onUpdate, valid}) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(placeholder);

  const change = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value), [setValue]);

  const validate = useMemo(() => {
    return  valid(value);
  }, [value,valid]);

  const edit = useCallback((e: any) => {
    e.preventDefault();
    setIsActive(true);
  }, [setIsActive]);

  const update = useCallback((e: any) => {
    e.preventDefault();
    if (validate) {
      return;
    } else {
      setIsActive(false);
      onUpdate(value);
    }
  }, [setIsActive,value,onUpdate,validate]);

  return (
    <div className="input-edit">
      <div className="input-edit__valid">{validate}</div>
      <input value={value}
        type="text"
        onChange={change}
        placeholder={placeholder}
        className={`standard-input edit ${isActive ? "" : "div"} ${validate ? "validate" : ""}`}
      />
      <button className="input-edit__btn"
        onClick={isActive ? update : edit}
      >
        {isActive ? "Update" : "Edit"}
      </button>
    </div>
  );
};
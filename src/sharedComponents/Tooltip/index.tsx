import React, {FC, ReactNode, useState} from "react";

import "./index.scss";
import useThrottle from "../../helpers/hooks/useThrottle";

type PTooltip = {
    content: string,
    children?: ReactNode,
}

const Tooltip: FC<PTooltip> = ({children, content}) => {

  const [showContent, setShowContent] = useState(false);

  const move = useThrottle((e: any) => {
    const el = e.target.querySelector(".tooltip__content");
    const moveEl = e.target.querySelector(".tooltip__container");
    if (el && moveEl) {
      const top = e.target.getBoundingClientRect().top;
      const left = e.target.getBoundingClientRect().left;
      moveEl.style.top = `${(e.clientY - top)/0.98}px`;
      moveEl.style.left = `${(e.clientX- left)/0.98}px`;
      el.style.display = "block";
      el.style.animation = "enter 400ms forwards 100ms";
    }
  }, 20);

  const mouseenter = async (e: any) => {
    await setShowContent(true);
    move(e);
  };
  const mouseleave = (e: any) => {
    const el = e.target.querySelector(".tooltip__content");
    if (el) el.style.animation = "exit 400ms forwards ";
  };

  return (
    <div className="tooltip"
      onMouseEnter={mouseenter}
      onMouseLeave={mouseleave}
      onMouseMove={move}
    >
      {showContent
            && <div className="tooltip__content">
              <div
                className="tooltip__container"
              ><span>{content}</span></div>
            </div>
      }
      <div className="tooltip__target">
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
import React, {FC, useCallback, useEffect, useState} from "react";
import "./index.scss";

type Props = {
    min: number,
    max: number,
    maxStart: number,
    onChange: ([x]: any) => void,
}

export const DoubleSlider: FC<Props> =
    ({
      min,
      max,
      maxStart,
      onChange
    }) => {
      const [minVal, setMinVal] = useState(min);
      const [maxVal, setMaxVal] = useState(maxStart);

      const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
      );

      useEffect(() => {
        onChange({min: minVal, max: maxVal});
      }, [minVal, maxVal, onChange]);

      return (
        <div className="double-slider">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 3);
              setMinVal(value);
            }}
            className="thumb thumb--left"
            style={{zIndex: (minVal > max - 100) ? "5" : ""}}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 3);
              setMaxVal(value);
            }}
            className="thumb thumb--right"
          />

          <div className="slider">
            <div className="slider__track"/>
            <div
              style={{
                left: `${getPercent(minVal)}%`,
                width: `${getPercent(maxVal) - getPercent(minVal)}%`
              }}
              className="slider__range"/>
          </div>
        </div>
      );
    };
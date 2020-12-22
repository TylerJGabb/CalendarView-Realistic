import React, { useEffect } from "react";
import dayjs from "dayjs";
import "./styles.css";
import { palette } from "./palette";

import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"];

function squarify() {
  let days: any = document.getElementsByClassName("calendar-day");
  days = Array.from(days);
  for (let day of days) {
    const w = day.offsetWidth;
    day.style.height = `${w}px`;
  }
}

/* https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox */
export type DotProps = {
  type: keyof typeof palette;
};
const Dot = ({ type }: DotProps) => {
  const fill = palette[type];
  return (
    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="4" fill={fill} />
    </svg>
  );
};

export default function App() {
  useEffect(() => {
    squarify();
    // does debouncing do anything? it doesn't seem to help much
    // window.addEventListener("resize", debounce(resize, 10));
    window.addEventListener("resize", squarify);
  }, []);
  return (
    <div className="main">
      <div className="day-names">
        {DAYS_OF_WEEK.map((d, i) => (
          <div key={i} className="day-name">
            {d}
          </div>
        ))}
      </div>
      <div className="calendar-container">
        <div className="calendar-day inactive"></div>
        <div className="calendar-day">
          <div className="day-number">7</div>
          <Dot type="post" />
          <Dot type="ghost" />
          <Dot type="newTrip" />
          <Dot type="outsideRap" />
          <div className="pch">99.99h</div>
        </div>
        <div className="calendar-day">
          <div className="day-number">12</div>
          <Dot type="pre" />
          <Dot type="ghost" />
          <div className="pch">1.05h</div>
        </div>
        <div className="calendar-day">
          <div className="day-number">23</div>
          <Dot type="payProtected" />
          <Dot type="post" />
          <div className="pch">18.45h</div>
        </div>
        <div className="calendar-day" />
        <div className="calendar-day inactive"></div>
        <div className="calendar-day inactive"></div>
        <div className="calendar-day inactive"></div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import dayjs from "dayjs";
import "./styles.css";
import { palette } from "./palette";

import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { debounce } from "./utils";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"];

function squareizeCalendarDays() {
  let days: any = document.getElementsByClassName("calendar-day");
  days = Array.from(days);
  for (let day of days) {
    const w = day.offsetWidth;
    day.style.height = `${w}px`;
  }
}

export default function App() {
  useEffect(() => {
    squareizeCalendarDays();
    // does debouncing do anything?
    // window.addEventListener("resize", debounce(resize, 10));
    window.addEventListener("resize", squareizeCalendarDays);
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
          <div className="day-number">1</div>
          <div className="pre"></div>
          <span className="pch">18.45</span>
        </div>
        <div className="calendar-day">
          <div className="day-number ghost">2</div>
          <div className="pre"></div>
          <span className="pch">7.64</span>
        </div>
        <div className="calendar-day">
          <div className="day-number">3</div>
          <div className="pre"></div>
          <div className="new-trip"></div>
          <div className="pay-protected"></div>
          <span className="pch">11.33</span>
        </div>
        <div className="calendar-day">
          <div className="day-number">4</div>
          <div className="post"></div>
          <div></div>
          <div className="pay-protected"></div>
          <span className="pch">3.82</span>
        </div>
        <div className="calendar-day">
          <div className="day-number">5</div>
          <div className="pre"></div>
          <div className="outside-rap"></div>
          <span className="pch">14.55</span>
        </div>
        <div className="calendar-day">
          <div className="post"></div>
          <span className="pch">9.55</span>
        </div>
        <div className="calendar-day">
          <div className="post"></div>
          <span className="pch">11.50</span>
        </div>
        <div className="calendar-day">
          <div className="post"></div>
          <span className="pch">8.00</span>
        </div>
        <div className="calendar-day">
          <div className="post"></div>
          <span className="pch">9.55</span>
        </div>
        <div className="calendar-day inactive"></div>
        <div className="calendar-day inactive"></div>
        <div className="calendar-day inactive"></div>
        <div className="calendar-day inactive"></div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./styles.css";

import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { DotType, Dot } from "./Dot";

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

/**
 * on clicking, need to be able to display all sorts of flight statistics
 * best to add flight as prop.
 *
 * For now, try to wrap all of these things up in a component.
 */
type CalendarDayProps = {
  types?: DotType[];
  inactive?: boolean;
  pch?: number | string;
  dayNumber?: number | string;
};

const CalendarDay = (props: CalendarDayProps) => {
  return props.inactive ? (
    <div className="calendar-day inactive" />
  ) : (
    <div className="calendar-day">
      <div className="day-number">{props.dayNumber}</div>
      {props.types?.map((t, idx) => (
        <Dot key={idx} type={t} />
      ))}
      <div className="pch">{props.pch}h</div>
    </div>
  );
};

const DaysOfWeek = () => (
  <div className="day-names">
    {DAYS_OF_WEEK.map((d, i) => (
      <div key={i} className="day-name">
        {d}
      </div>
    ))}
  </div>
);

export default function App() {
  const [month, setMonth] = useState(1);
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);
  useEffect(() => {
    const now = dayjs("2020-" + month);
    const prev = now.subtract(1, "month"); //will be 1st of prev month
    const inactiveBefore = prev.add(prev.daysInMonth() - 1, "day").weekday();
    const lastDayNow = now.add(now.daysInMonth() - 1, "day").weekday();
    const inactiveAfter = lastDayNow ? 7 - lastDayNow : 0;
    setAfter(inactiveAfter);
    setBefore(inactiveBefore);
    squarify();
  }, [month]);
  useEffect(() => {
    squarify();
    window.addEventListener("resize", squarify);
    return () => window.removeEventListener("resize", squarify);
  }, []);
  let key = 0;
  return (
    <div className="main">
      <button onClick={() => setMonth(month - 1)}>prev</button>
      <button onClick={() => setMonth(month + 1)}>next</button>
      COLOR LEGEND SHOULD GO HERE
      <h1>{dayjs("2020-" + month).format("MMMM YYYY")}</h1>
      <DaysOfWeek />
      <div className="calendar-container">
        {[...Array(before)].map((_, idx) => (
          <CalendarDay key={key++} inactive />
        ))}
        {[...Array(dayjs("2020-" + month).daysInMonth())].map((_, idx) => {
          const types: DotType[] = [Math.random() < 0.5 ? "post" : "pre"];
          if (Math.random() < 0.5) types.push("ghost");
          if (Math.random() < 0.5) types.push("payProtected");
          if (Math.random() < 0.5) types.push("newTrip");
          if (Math.random() < 0.5 && types.length < 4) types.push("outsideRap");
          return (
            <CalendarDay
              key={key++}
              dayNumber={idx + 1}
              pch={(Math.random() * 100).toFixed(2)}
              types={types}
            />
          );
        })}
        {[...Array(after)].map((_, idx) => (
          <CalendarDay key={key++} inactive />
        ))}
      </div>
    </div>
  );
}

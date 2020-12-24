import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

dayjs().format("YYYY-MM");

export type CalendarProps = {};
export const Calendar = (props: CalendarProps) => {
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
  }, [month]);
  return (
    <div>
      <pre>
        {JSON.stringify(
          {
            month: dayjs("2020-" + month).format("MMMM YYYY"),
            before,
            after
          },
          null,
          2
        )}
      </pre>
      <button onClick={() => setMonth(month + 1)}>next</button>
    </div>
  );
};

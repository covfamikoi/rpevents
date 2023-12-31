import { ReactNode, createContext, useMemo, useState } from "react";
import {
  CalendarDate,
  calendarDateFromJsDateObject,
} from "typescript-calendar-date";

export const DateContext = createContext<
  [CalendarDate, (date: CalendarDate) => void] | undefined
>(undefined);
export const RangeContext = createContext<
  [CalendarDate, CalendarDate] | undefined
>(undefined);

export default function CalendarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [date, setDate] = useState(() =>
    calendarDateFromJsDateObject(new Date()),
  );
  const [start, end] = useMemo<[CalendarDate, CalendarDate]>(
    () => [
      { year: date.year, month: "jan", day: 1 },
      { year: date.year + 1, month: "jan", day: 1 },
    ],
    [],
  );

  return (
    <RangeContext.Provider value={[start, end]}>
      <DateContext.Provider value={[date, setDate]}>
        {children}
      </DateContext.Provider>
    </RangeContext.Provider>
  );
}

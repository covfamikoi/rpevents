import { ReactNode, createContext, useState } from "react";
import {
  CalendarDate,
  calendarDateFromJsDateObject,
} from "typescript-calendar-date";

export const DateContext = createContext<
  [CalendarDate, (date: CalendarDate) => void] | undefined
>(undefined);

export default function DateProvider({ children }: { children: ReactNode }) {
  const [date, setDate] = useState(() =>
    calendarDateFromJsDateObject(new Date()),
  );

  return (
    <DateContext.Provider value={[date, setDate]}>
      {children}
    </DateContext.Provider>
  );
}

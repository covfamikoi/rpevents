import { useContext, useMemo } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import {
  CalendarDate,
  calendarDateFromJsDateObject,
} from "typescript-calendar-date";

import { Event } from "../../models";

import { DateContext } from "./Provider";

interface EventItem {
  title: string;
  description: string;
  start: Date;
  end: Date;
}

function dateToString(date: CalendarDate): string {
  return `${date.year}-${date.month}-${date.day}`;
}

export default function CalendarEvents({ events }: { events: Event[] }) {
  const [currentDate, _setCurrentDate] = useContext(DateContext)!;

  const eventsByDay = useMemo<Map<string, EventItem[]>>(() => {
    let eventsByDay = new Map<string, EventItem[]>();
    events.forEach((event) => {
      const eventItem = {
        title: event.name,
        description: event.info,
        start: event.start.toDate(),
        end: event.end.toDate(),
      };
      const date = calendarDateFromJsDateObject(event.start.toDate());

      const key = dateToString(date);
      if (!eventsByDay.has(key)) {
        eventsByDay.set(key, []);
      }
      eventsByDay.get(key)!.push(eventItem);
    });
    return eventsByDay;
  }, [events]);

  const todaysEvents = useMemo(
    () => eventsByDay.get(dateToString(currentDate)),
    [eventsByDay, currentDate],
  );

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text>{todaysEvents?.map((e) => e.title).join(",")}</Text>
    </ScrollView>
  );
}

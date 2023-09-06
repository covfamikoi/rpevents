import { useContext, useMemo } from "react";
import { FlatList, View } from "react-native";
import { Text, Title, useTheme } from "react-native-paper";
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

function TimelineItem({ item }: { item: EventItem }) {
  const theme = useTheme();
  const now = new Date();

  let container: string;
  let onContainer: string;
  if (now < item.start) {
    container = theme.colors.primaryContainer;
    onContainer = theme.colors.onPrimaryContainer;
  } else if (now >= item.start && now <= item.end) {
    container = theme.colors.tertiaryContainer;
    onContainer = theme.colors.onTertiaryContainer;
  } else {
    container = theme.colors.secondaryContainer;
    onContainer = theme.colors.onSecondaryContainer;
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: 80,
          alignItems: "flex-end",
          padding: 5,
          margin: 10,
          marginRight: 0,
        }}
      >
        <Text>{dateToLocaleTimeString(item.start)}</Text>
        <Text>to</Text>
        <Text>{dateToLocaleTimeString(item.end)}</Text>
      </View>
      <View
        style={{
          flex: 1,
          borderRadius: theme.roundness,
          backgroundColor: container,
          padding: 5,
          margin: 10,
          marginLeft: 5,
        }}
      >
        <Title style={{ color: onContainer }}>{item.title}</Title>
        <Text style={{ color: onContainer }}>{item.description}</Text>
      </View>
    </View>
  );
}

function dateToLocaleTimeString(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
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
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={todaysEvents}
      renderItem={(item) => <TimelineItem item={item.item} />}
    />
  );
}

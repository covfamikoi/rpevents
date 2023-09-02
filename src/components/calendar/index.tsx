import { ReactNode, useContext, useMemo, useRef } from "react";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DateContext } from "./context";
import { ListView } from "react-native";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import PagerView from "react-native-pager-view";
import { CalendarDate, CalendarMonth, dayOfWeek, lastDateInMonth } from "typescript-calendar-date";

function RowItem({
  children,
  highlighted = false,
}: {
  children: string;
  highlighted?: boolean;
}) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: 30,
        marginHorizontal: 5,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.roundness,
        backgroundColor: highlighted ? theme.colors.tertiary : undefined,
      }}
    >
      <Text
        style={{
          color: highlighted
            ? theme.colors.onPrimary
            : theme.colors.onBackground,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

function CalendarRow({
  children,
  selected = false,
  index,
  animatedIndex,
  height = 30,
}: {
  children: ReactNode;
  selected?: boolean;
  index: number;
  animatedIndex: SharedValue<number>;
  height?: number;
}) {
  const marginV = 5;

  const offset = height + 2 * marginV;
  var to: [number, number] = selected ? [-offset * index, 0] : [0, 0];

  const rowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animatedIndex.value, [0, 1], to, "clamp") },
    ],
    opacity: selected
      ? 1
      : interpolate(animatedIndex.value, [0.8, 1], [0, 1], "clamp"),
  }));

  return (
    <Animated.View style={rowStyle}>
      <View
        style={{
          width: Dimensions.get("window").width,
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: height,
          marginVertical: marginV,
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
}

function offset(day: CalendarDate): number {
  let offset: number;
  switch (dayOfWeek(day)) {
    case "sun": offset = 0; break
    case "mon": offset = 1; break
    case "tue": offset = 2; break
    case "wed": offset = 3; break
    case "thu": offset = 4; break
    case "fri": offset = 5; break
    case "sat": offset = 6; break
  };
  return offset
}

function MonthPage({animatedIndex, month, date}: {animatedIndex: SharedValue<number>, month: CalendarMonth, date: CalendarDate}) {
  const firstDay: CalendarDate = {day: 1, ...month};
  const lastDay: CalendarDate = lastDateInMonth(month);
  const startOffset = offset(firstDay);
  const endOffset = 6 - offset(lastDay);

  let data = useMemo(() => {
    let data = Array(startOffset).fill(null);
    data.push(...Array(lastDay.day).keys());
    data.push(...Array(endOffset).fill(null));

    let chunked: (number | null)[][] = [];
    for (let i = 0; i < data.length; i += 7) {
      chunked.push(data.slice(i, i + 7));
    }

    return chunked;
  }, [offset, lastDay]);

  return (
    <Animated.View key={month.month + "-" + month.year.toString()} style={{flex: 1}}>
      {data.map((row, idx) => {
        return (
          <CalendarRow key={`${month.month}-${month.year}-${idx}`} index={idx} animatedIndex={animatedIndex}>
            {row.map((_day, idx) => {
              const day = _day == null ? null : _day + 1;
              return (
                <RowItem key={`${month.month}-${month.year}-${day}-${idx}`}>{day == null ? "" : day.toString()}</RowItem>
              )
            })}
          </CalendarRow>
        );
      })}
    </Animated.View>
  );
}

export default function Index() {
  const theme = useTheme();
  const [date, _setDate] = useContext(DateContext)!;

  const snapPoints = useMemo<[number, number]>(() => [110, 315], []);

  const animatedIndex = useSharedValue(0);

  return (
    <BottomSheet
      animatedIndex={animatedIndex}
      index={0}
      snapPoints={snapPoints}
      style={{
        shadowOpacity: 0.2,
        shadowColor: theme.colors.shadow,
        backgroundColor: theme.colors.elevation.level1,
        borderRadius: 15,
      }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.tertiary }}
      backgroundStyle={{ backgroundColor: theme.colors.elevation.level1 }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text>{date.month} {date.year}</Text>
      </View>
      <View
        style={{
          height: 15,
          marginVertical: 5,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <RowItem>Sun</RowItem>
        <RowItem>Mon</RowItem>
        <RowItem>Tue</RowItem>
        <RowItem>Wed</RowItem>
        <RowItem>Thu</RowItem>
        <RowItem>Fri</RowItem>
        <RowItem>Sat</RowItem>
      </View>
      <PagerView initialPage={0} style={{flex: 1}}>
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "jan"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "feb"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "mar"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "apr"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "may"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "jun"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "jul"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "aug"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "sep"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "nov"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "oct"}} />
        <MonthPage animatedIndex={animatedIndex} date={date} month={{year: 2023, month: "dec"}} />
      </PagerView>
    </BottomSheet>
  );
}

import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  CalendarDate,
  CalendarMonth,
  areInOrder,
  datesEqual,
  dayOfWeek,
  lastDateInMonth,
  periodOfMonths,
} from "typescript-calendar-date";

import BottomSheet from "@gorhom/bottom-sheet";

import { DateContext, RangeContext } from "./Provider";

function RowItem({
  children,
  highlighted = false,
  onSelect = null,
}: {
  children: string;
  highlighted?: boolean;
  onSelect?: (() => void) | null;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onSelect}
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
    </Pressable>
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
    case "sun":
      offset = 0;
      break;
    case "mon":
      offset = 1;
      break;
    case "tue":
      offset = 2;
      break;
    case "wed":
      offset = 3;
      break;
    case "thu":
      offset = 4;
      break;
    case "fri":
      offset = 5;
      break;
    case "sat":
      offset = 6;
      break;
  }
  return offset;
}

function MonthPage({
  animatedIndex,
  month,
  currentDate,
  setCurrentDate,
  key,
}: {
  animatedIndex: SharedValue<number>;
  month: CalendarMonth;
  currentDate: CalendarDate;
  setCurrentDate: (arg0: CalendarDate) => void;
  key: string;
}) {
  const firstDay: CalendarDate = { day: 1, ...month };
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
    <Animated.View key={key} style={{ flex: 1 }}>
      {data.map((row, idx) => {
        const rowSelected = areInOrder(
          { ...firstDay, day: row.find((v) => v !== null)! + 1 },
          currentDate,
          { ...firstDay, day: row.findLast((v) => v !== null)! + 1 },
        );
        return (
          <CalendarRow
            key={`${key}-row-${idx}`}
            index={idx}
            animatedIndex={animatedIndex}
            selected={rowSelected}
          >
            {row.map((_day, idx) => {
              const day = _day == null ? null : _day + 1;
              let selected: boolean;
              let onSelect: (() => void) | null = null;
              if (day === null) {
                selected = false;
              } else {
                const thisDate = { ...firstDay, day: day };
                selected = datesEqual(thisDate, currentDate);
                onSelect = () => setCurrentDate(thisDate);
              }
              return (
                <RowItem
                  key={`${key}-day-${day}-${idx}`}
                  onSelect={onSelect}
                  highlighted={selected}
                >
                  {day == null ? "" : day.toString()}
                </RowItem>
              );
            })}
          </CalendarRow>
        );
      })}
    </Animated.View>
  );
}

export default function CalendarSheet({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useContext(DateContext)!;
  const [startDate, endDate] = useContext(RangeContext)!;

  const snapPoints = useMemo<[number, number]>(() => [110, 315], []);

  const animatedIndex = useSharedValue(0);

  const [indexToMonth, monthToIndex] = useMemo(
    function () {
      const indexToMonth = periodOfMonths(startDate, endDate);
      const monthToIndex: Map<string, number> = new Map();
      indexToMonth.forEach((month, idx) => {
        monthToIndex.set(`${month.year}-${month.month}`, idx);
      });
      return [indexToMonth, monthToIndex];
    },
    [startDate, endDate],
  );

  const [currentIndex, _setCurrentIndex] = useState(
    monthToIndex.get(`${currentDate.year}-${currentDate.month}`)!,
  );
  useEffect(() => {
    _setCurrentIndex(
      monthToIndex.get(`${currentDate.year}-${currentDate.month}`)!,
    );
  }, [currentDate]);
  const setCurrentIndex = (number: number) => {
    if (number === currentIndex) {
      return;
    }
    _setCurrentIndex(number);
    setCurrentDate({ ...indexToMonth[number], day: 1 });
  };

  return (
    <>
      <ScrollView
        style={{ marginBottom: snapPoints[0] }}
        contentInsetAdjustmentBehavior="automatic"
      >
        {children}
      </ScrollView>
      <BottomSheet
        activeOffsetX={999_999}
        activeOffsetY={[-5, 5]}
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
          <Text>
            {(function () {
              const date = indexToMonth[currentIndex];
              return `${date.month} ${date.year}`;
            })()}
          </Text>
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
        <PagerView
          onPageSelected={(pos) => setCurrentIndex(pos.nativeEvent.position)}
          initialPage={currentIndex}
          style={{ flex: 1 }}
        >
          {indexToMonth.map((month, idx) => {
            const key = `${month.month}-${month.year}`;
            if (currentIndex - 1 <= idx && idx <= currentIndex + 1) {
              return (
                <MonthPage
                  animatedIndex={animatedIndex}
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  month={month}
                  key={key}
                />
              );
            } else {
              return <View key={key} />;
            }
          })}
        </PagerView>
      </BottomSheet>
    </>
  );
}

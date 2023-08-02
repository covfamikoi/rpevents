import { ReactNode, useCallback, useMemo, useRef } from "react";
import { Dimensions, StyleSheet, View, useAnimatedValue } from "react-native";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomSheet from "@gorhom/bottom-sheet";
import { useHeaderHeight } from "@react-navigation/elements";

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
  mode,
  index,
  animatedPos,
  range,
  height = 30,
}: {
  children: ReactNode;
  mode: "selected" | "stay" | "down" | "none";
  index: number;
  animatedPos: SharedValue<number>;
  range: SharedValue<[number, number]>;
  height?: number;
}) {
  const marginV = 5;

  const offset = height + 2 * marginV;
  var to: [number, number];
  switch (mode) {
    case "selected":
      to = [-offset * index, 0];
      break;
    case "down":
      to = [offset, 0];
      break;
    case "stay":
    case "none":
      to = [0, 0];
      break;
  }

  const rowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animatedPos.value, range.value, to, "clamp") },
    ],
    opacity:
      mode !== "selected"
        ? interpolate(
            animatedPos.value,
            [
              range.value[0] + (range.value[1] - range.value[0]) / 1.3,
              range.value[1],
            ],
            [0, 1],
          )
        : 1,
  }));

  return (
    <Animated.View style={mode !== "none" ? rowStyle : {}}>
      <View
        style={{
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

export default function Index() {
  const theme = useTheme();
  const windowHeight = Dimensions.get("window").height;
  const header = useHeaderHeight();
  const offsets = useSafeAreaInsets();
  const offsetsShared = useSharedValue(offsets);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo<[number, number]>(() => [110, 275], []);
  const animatedPos = useSharedValue(0);
  const animatedPosRange = useDerivedValue<[number, number]>(
    () => [
      windowHeight - snapPoints[0] - offsetsShared.value.top,
      windowHeight - snapPoints[1] - offsetsShared.value.top,
    ],
    [snapPoints, windowHeight, offsetsShared],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      animatedPosition={animatedPos}
      index={0}
      snapPoints={snapPoints}
      style={{ shadowOpacity: 0.2, shadowColor: theme.colors.shadow }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.tertiary }}
      backgroundStyle={{ backgroundColor: theme.colors.elevation.level1 }}
      containerOffset={offsetsShared}
    >
      <Animated.View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>August 2023</Text>
        </View>
        <CalendarRow
          height={15}
          mode="none"
          index={0}
          animatedPos={animatedPos}
          range={animatedPosRange}
        >
          <RowItem>Sun</RowItem>
          <RowItem>Mon</RowItem>
          <RowItem>Tue</RowItem>
          <RowItem>Wed</RowItem>
          <RowItem>Thu</RowItem>
          <RowItem>Fri</RowItem>
          <RowItem>Sat</RowItem>
        </CalendarRow>
        <CalendarRow
          mode="down"
          index={0}
          animatedPos={animatedPos}
          range={animatedPosRange}
        >
          <RowItem>1</RowItem>
          <RowItem>2</RowItem>
          <RowItem>3</RowItem>
          <RowItem>4</RowItem>
          <RowItem>5</RowItem>
          <RowItem>6</RowItem>
          <RowItem>7</RowItem>
        </CalendarRow>
        <CalendarRow
          mode="selected"
          index={1}
          animatedPos={animatedPos}
          range={animatedPosRange}
        >
          <RowItem>8</RowItem>
          <RowItem highlighted>9</RowItem>
          <RowItem>10</RowItem>
          <RowItem>11</RowItem>
          <RowItem>12</RowItem>
          <RowItem>13</RowItem>
          <RowItem>14</RowItem>
        </CalendarRow>
        <CalendarRow
          mode="stay"
          index={2}
          animatedPos={animatedPos}
          range={animatedPosRange}
        >
          <RowItem>15</RowItem>
          <RowItem>16</RowItem>
          <RowItem>17</RowItem>
          <RowItem>18</RowItem>
          <RowItem>19</RowItem>
          <RowItem>20</RowItem>
          <RowItem>21</RowItem>
        </CalendarRow>
        <CalendarRow
          mode="stay"
          index={2}
          animatedPos={animatedPos}
          range={animatedPosRange}
        >
          <RowItem>22</RowItem>
          <RowItem>23</RowItem>
          <RowItem>24</RowItem>
          <RowItem>25</RowItem>
          <RowItem>26</RowItem>
          <RowItem>27</RowItem>
          <RowItem>28</RowItem>
        </CalendarRow>
        <CalendarRow
          mode="stay"
          index={2}
          animatedPos={animatedPos}
          range={animatedPosRange}
        >
          <RowItem>29</RowItem>
          <RowItem>30</RowItem>
          <RowItem>31</RowItem>
          <RowItem>0</RowItem>
          <RowItem>1</RowItem>
          <RowItem>2</RowItem>
          <RowItem>3</RowItem>
        </CalendarRow>
      </Animated.View>
    </BottomSheet>
  );
}

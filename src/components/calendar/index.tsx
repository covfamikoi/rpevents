import { ReactNode, useMemo } from "react";
import { View } from "react-native";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import BottomSheet from "@gorhom/bottom-sheet";

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

  const snapPoints = useMemo<[number, number]>(() => [110, 275], []);

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
      <Animated.View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>August 2023</Text>
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
        <CalendarRow index={0} animatedIndex={animatedIndex}>
          <RowItem>1</RowItem>
          <RowItem>2</RowItem>
          <RowItem>3</RowItem>
          <RowItem>4</RowItem>
          <RowItem>5</RowItem>
          <RowItem>6</RowItem>
          <RowItem>7</RowItem>
        </CalendarRow>
        <CalendarRow selected index={1} animatedIndex={animatedIndex}>
          <RowItem>8</RowItem>
          <RowItem highlighted>9</RowItem>
          <RowItem>10</RowItem>
          <RowItem>11</RowItem>
          <RowItem>12</RowItem>
          <RowItem>13</RowItem>
          <RowItem>14</RowItem>
        </CalendarRow>
        <CalendarRow index={2} animatedIndex={animatedIndex}>
          <RowItem>15</RowItem>
          <RowItem>16</RowItem>
          <RowItem>17</RowItem>
          <RowItem>18</RowItem>
          <RowItem>19</RowItem>
          <RowItem>20</RowItem>
          <RowItem>21</RowItem>
        </CalendarRow>
        <CalendarRow index={3} animatedIndex={animatedIndex}>
          <RowItem>22</RowItem>
          <RowItem>23</RowItem>
          <RowItem>24</RowItem>
          <RowItem>25</RowItem>
          <RowItem>26</RowItem>
          <RowItem>27</RowItem>
          <RowItem>28</RowItem>
        </CalendarRow>
        <CalendarRow index={4} animatedIndex={animatedIndex}>
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

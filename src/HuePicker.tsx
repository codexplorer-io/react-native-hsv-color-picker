import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  PanResponder,
  StyleSheet,
  StyleProp,
  ViewStyle,
  PanResponderGestureState,
  GestureResponderEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import chroma from 'chroma-js';
import { useAppTheme } from '@codexporer.io/expo-app-theme';
import normalizeValue from './utils';

const HUE_COLORS = [
  '#ff0000',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#0000ff',
  '#ff00ff',
  '#ff0000',
] as const;

export interface HuePickerDragEvent {
  hue: number;
  gestureState: PanResponderGestureState;
}

export interface HuePickerPressEvent {
  hue: number;
  nativeEvent: GestureResponderEvent['nativeEvent'];
}

export interface HuePickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  hue?: number;
  barWidth?: number;
  barHeight?: number;
  sliderSize?: number;
  sliderBorderColor?: string;
  onDragStart?: (event: HuePickerDragEvent) => void;
  onDragMove?: (event: HuePickerDragEvent) => void;
  onDragEnd?: (event: HuePickerDragEvent) => void;
  onDragTerminate?: (event: HuePickerDragEvent) => void;
  onPress?: (event: HuePickerPressEvent) => void;
}

export const HuePicker: React.FC<HuePickerProps> = ({
  containerStyle,
  borderRadius = 0,
  hue = 0,
  barWidth = 12,
  barHeight = 200,
  sliderSize = 24,
  sliderBorderColor,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDragTerminate,
  onPress,
}) => {
  const theme = useAppTheme();
  const sliderY = useRef(new Animated.Value((barHeight * hue) / 360)).current;
  const dragStartValue = useRef<number>(hue);

  useEffect(() => {
    sliderY.setValue((barHeight * hue) / 360);
  }, [hue, barHeight, sliderY]);

  const callbacksRef = useRef({
    hue,
    barHeight,
    onDragStart,
    onDragMove,
    onDragEnd,
    onDragTerminate,
    onPress,
  });

  callbacksRef.current = {
    hue,
    barHeight,
    onDragStart,
    onDragMove,
    onDragEnd,
    onDragTerminate,
    onPress,
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (_evt, gestureState) => {
          dragStartValue.current = callbacksRef.current.hue;
          if (callbacksRef.current.onDragStart) {
            const diff = gestureState.dy / callbacksRef.current.barHeight;
            const computedHue =
              normalizeValue(dragStartValue.current / 360 + diff) * 360;
            callbacksRef.current.onDragStart({
              hue: computedHue,
              gestureState,
            });
          }
        },
        onPanResponderMove: (_evt, gestureState) => {
          if (callbacksRef.current.onDragMove) {
            const diff = gestureState.dy / callbacksRef.current.barHeight;
            const computedHue =
              normalizeValue(dragStartValue.current / 360 + diff) * 360;
            callbacksRef.current.onDragMove({
              hue: computedHue,
              gestureState,
            });
          }
        },
        onPanResponderTerminationRequest: () => true,
        onPanResponderRelease: (_evt, gestureState) => {
          if (callbacksRef.current.onDragEnd) {
            const diff = gestureState.dy / callbacksRef.current.barHeight;
            const computedHue =
              normalizeValue(dragStartValue.current / 360 + diff) * 360;
            callbacksRef.current.onDragEnd({
              hue: computedHue,
              gestureState,
            });
          }
        },
        onPanResponderTerminate: (_evt, gestureState) => {
          if (callbacksRef.current.onDragTerminate) {
            const diff = gestureState.dy / callbacksRef.current.barHeight;
            const computedHue =
              normalizeValue(dragStartValue.current / 360 + diff) * 360;
            callbacksRef.current.onDragTerminate({
              hue: computedHue,
              gestureState,
            });
          }
        },
        onShouldBlockNativeResponder: () => true,
      }),
    []
  );

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (callbacksRef.current.onPress) {
        const { locationY } = event.nativeEvent;
        const computedHue =
          normalizeValue(locationY / callbacksRef.current.barHeight) * 360;
        callbacksRef.current.onPress({
          hue: computedHue,
          nativeEvent: event.nativeEvent,
        });
      }
    },
    []
  );

  const currentColor = useMemo(() => {
    return chroma.hsl(hue, 1, 0.5).hex();
  }, [hue]);

  const paddingTop = sliderSize / 2;
  const paddingLeft =
    sliderSize - barWidth > 0 ? (sliderSize - barWidth) / 2 : 0;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop,
          paddingBottom: paddingTop,
          paddingLeft,
          paddingRight: paddingLeft,
        },
        containerStyle,
      ]}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <LinearGradient
          colors={HUE_COLORS}
          style={{
            borderRadius,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: barWidth,
              height: barHeight,
            }}
          />
        </LinearGradient>
      </TouchableWithoutFeedback>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.slider,
          {
            width: sliderSize,
            height: sliderSize,
            borderRadius: sliderSize / 2,
            borderWidth: sliderSize / 10,
            backgroundColor: currentColor,
            borderColor: sliderBorderColor ?? theme.border,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.35,
            shadowRadius: 3,
            elevation: 4,
            transform: [
              {
                translateY: sliderY,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    top: 0,
    position: 'absolute',
  },
});

export default HuePicker;

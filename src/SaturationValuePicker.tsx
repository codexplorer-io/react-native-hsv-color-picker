import React, {
  useMemo,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
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

export interface SatValPickerDragEvent {
  saturation: number;
  value: number;
  gestureState: PanResponderGestureState;
}

export interface SatValPickerPressEvent {
  saturation: number;
  value: number;
  nativeEvent: GestureResponderEvent['nativeEvent'];
}

export interface SaturationValuePickerRef {
  getCurrentColor: () => string;
}

export interface SaturationValuePickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  size?: number;
  sliderSize?: number;
  hue?: number;
  saturation?: number;
  value?: number;
  sliderBorderColor?: string;
  canvasBorderColor?: string;
  onDragStart?: (event: SatValPickerDragEvent) => void;
  onDragMove?: (event: SatValPickerDragEvent) => void;
  onDragEnd?: (event: SatValPickerDragEvent) => void;
  onDragTerminate?: (event: SatValPickerDragEvent) => void;
  onPress?: (event: SatValPickerPressEvent) => void;
}

export const SaturationValuePicker = forwardRef<
  SaturationValuePickerRef,
  SaturationValuePickerProps
>(
  (
    {
      containerStyle,
      borderRadius = 0,
      size = 200,
      sliderSize = 24,
      hue = 0,
      saturation = 1,
      value = 1,
      sliderBorderColor,
      canvasBorderColor,
      onDragStart,
      onDragMove,
      onDragEnd,
      onDragTerminate,
      onPress,
    },
    ref
  ) => {
    const theme = useAppTheme();
    const dragStartValue = useRef<{ saturation: number; value: number }>({
      saturation,
      value,
    });

    const callbacksRef = useRef({
      size,
      saturation,
      value,
      onDragStart,
      onDragMove,
      onDragEnd,
      onDragTerminate,
      onPress,
    });

    callbacksRef.current = {
      size,
      saturation,
      value,
      onDragStart,
      onDragMove,
      onDragEnd,
      onDragTerminate,
      onPress,
    };

    const getCurrentColor = useCallback(() => {
      return chroma.hsv(hue, saturation, value).hex();
    }, [hue, saturation, value]);

    useImperativeHandle(
      ref,
      () => ({
        getCurrentColor,
      }),
      [getCurrentColor]
    );

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onStartShouldSetPanResponderCapture: () => true,
          onMoveShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponderCapture: () => true,
          onPanResponderGrant: (_evt, gestureState) => {
            dragStartValue.current = {
              saturation: callbacksRef.current.saturation,
              value: callbacksRef.current.value,
            };
            if (callbacksRef.current.onDragStart) {
              const diffx = gestureState.dx / callbacksRef.current.size;
              const diffy = gestureState.dy / callbacksRef.current.size;
              callbacksRef.current.onDragStart({
                saturation: normalizeValue(
                  dragStartValue.current.saturation + diffx
                ),
                value: normalizeValue(dragStartValue.current.value - diffy),
                gestureState,
              });
            }
          },
          onPanResponderMove: (_evt, gestureState) => {
            if (callbacksRef.current.onDragMove) {
              const diffx = gestureState.dx / callbacksRef.current.size;
              const diffy = gestureState.dy / callbacksRef.current.size;
              callbacksRef.current.onDragMove({
                saturation: normalizeValue(
                  dragStartValue.current.saturation + diffx
                ),
                value: normalizeValue(dragStartValue.current.value - diffy),
                gestureState,
              });
            }
          },
          onPanResponderTerminationRequest: () => true,
          onPanResponderRelease: (_evt, gestureState) => {
            if (callbacksRef.current.onDragEnd) {
              const diffx = gestureState.dx / callbacksRef.current.size;
              const diffy = gestureState.dy / callbacksRef.current.size;
              callbacksRef.current.onDragEnd({
                saturation: normalizeValue(
                  dragStartValue.current.saturation + diffx
                ),
                value: normalizeValue(dragStartValue.current.value - diffy),
                gestureState,
              });
            }
          },
          onPanResponderTerminate: (_evt, gestureState) => {
            if (callbacksRef.current.onDragTerminate) {
              const diffx = gestureState.dx / callbacksRef.current.size;
              const diffy = gestureState.dy / callbacksRef.current.size;
              callbacksRef.current.onDragTerminate({
                saturation: normalizeValue(
                  dragStartValue.current.saturation + diffx
                ),
                value: normalizeValue(dragStartValue.current.value - diffy),
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
          const { locationX, locationY } = event.nativeEvent;
          callbacksRef.current.onPress({
            saturation: normalizeValue(locationX / callbacksRef.current.size),
            value: 1 - normalizeValue(locationY / callbacksRef.current.size),
            nativeEvent: event.nativeEvent,
          });
        }
      },
      []
    );

    const baseHueColor = useMemo(() => {
      return chroma.hsl(hue, 1, 0.5).hex();
    }, [hue]);

    return (
      <View
        style={[
          styles.container,
          {
            height: size + sliderSize,
            width: size + sliderSize,
          },
          containerStyle,
        ]}
      >
        <TouchableWithoutFeedback onPress={handlePress}>
          <LinearGradient
            style={[
              {
                borderRadius,
                borderColor: canvasBorderColor ?? theme.border,
              },
              styles.linearGradient,
            ]}
            colors={['#fff', baseHueColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <LinearGradient colors={['rgba(0, 0, 0, 0)', '#000']}>
              <View
                style={{
                  height: size,
                  width: size,
                }}
              />
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
        <View
          {...panResponder.panHandlers}
          style={[
            styles.slider,
            {
              width: sliderSize,
              height: sliderSize,
              borderRadius: sliderSize / 2,
              borderWidth: sliderSize / 10,
              backgroundColor: getCurrentColor(),
              borderColor: sliderBorderColor ?? theme.border,
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.35,
              shadowRadius: 3,
              elevation: 4,
              transform: [
                { translateX: size * saturation },
                { translateY: size * (1 - value) },
              ],
            },
          ]}
        />
      </View>
    );
  }
);

SaturationValuePicker.displayName = 'SaturationValuePicker';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    top: 0,
    left: 0,
    position: 'absolute',
  },
  linearGradient: {
    overflow: 'hidden',
  },
});

export default SaturationValuePicker;

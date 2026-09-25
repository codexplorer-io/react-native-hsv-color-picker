import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useAppTheme } from '@codexporer.io/expo-app-theme';
import chroma from 'chroma-js';
import HuePicker, {
  HuePickerDragEvent,
  HuePickerPressEvent,
} from './HuePicker';
import SaturationValuePicker, {
  SaturationValuePickerRef,
  SatValPickerDragEvent,
  SatValPickerPressEvent,
} from './SaturationValuePicker';

export interface HsvColorPickerRef {
  getCurrentColor: () => string;
}

export interface HsvColorPickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  borderColor?: string;
  sliderBorderColor?: string;

  huePickerContainerStyle?: StyleProp<ViewStyle>;
  huePickerBorderRadius?: number;
  huePickerHue?: number;
  huePickerBarWidth?: number;
  huePickerBarHeight?: number;
  huePickerSliderSize?: number;
  onHuePickerDragStart?: (event: HuePickerDragEvent) => void;
  onHuePickerDragMove?: (event: HuePickerDragEvent) => void;
  onHuePickerDragEnd?: (event: HuePickerDragEvent) => void;
  onHuePickerDragTerminate?: (event: HuePickerDragEvent) => void;
  onHuePickerPress?: (event: HuePickerPressEvent) => void;

  satValPickerContainerStyle?: StyleProp<ViewStyle>;
  satValPickerBorderRadius?: number;
  satValPickerSize?: number;
  satValPickerSliderSize?: number;
  satValPickerHue?: number;
  satValPickerSaturation?: number;
  satValPickerValue?: number;
  onSatValPickerDragStart?: (event: SatValPickerDragEvent) => void;
  onSatValPickerDragMove?: (event: SatValPickerDragEvent) => void;
  onSatValPickerDragEnd?: (event: SatValPickerDragEvent) => void;
  onSatValPickerDragTerminate?: (event: SatValPickerDragEvent) => void;
  onSatValPickerPress?: (event: SatValPickerPressEvent) => void;
}

export const HsvColorPicker = forwardRef<HsvColorPickerRef, HsvColorPickerProps>(
  (
    {
      containerStyle,
      backgroundColor,
      borderColor,
      sliderBorderColor,

      huePickerContainerStyle,
      huePickerBorderRadius = 0,
      huePickerHue = 0,
      huePickerBarWidth = 12,
      huePickerBarHeight = 200,
      huePickerSliderSize = 24,
      onHuePickerDragStart,
      onHuePickerDragMove,
      onHuePickerDragEnd,
      onHuePickerDragTerminate,
      onHuePickerPress,

      satValPickerContainerStyle,
      satValPickerBorderRadius = 0,
      satValPickerSize = 200,
      satValPickerSliderSize = 24,
      satValPickerHue = 0,
      satValPickerSaturation = 1,
      satValPickerValue = 1,
      onSatValPickerDragStart,
      onSatValPickerDragMove,
      onSatValPickerDragEnd,
      onSatValPickerDragTerminate,
      onSatValPickerPress,
    },
    ref
  ) => {
    const theme = useAppTheme();
    const satValPickerRef = useRef<SaturationValuePickerRef>(null);

    useImperativeHandle(
      ref,
      () => ({
        getCurrentColor: () => {
          return (
            satValPickerRef.current?.getCurrentColor() ??
            chroma
              .hsv(satValPickerHue, satValPickerSaturation, satValPickerValue)
              .hex()
          );
        },
      }),
      [satValPickerHue, satValPickerSaturation, satValPickerValue]
    );

    const resolvedBackgroundColor = backgroundColor ?? theme.surface;
    const resolvedBorderColor = borderColor ?? theme.border;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: resolvedBackgroundColor,
            borderColor: resolvedBorderColor,
          },
          containerStyle,
        ]}
      >
        <SaturationValuePicker
          ref={satValPickerRef}
          containerStyle={satValPickerContainerStyle}
          borderRadius={satValPickerBorderRadius}
          size={satValPickerSize}
          sliderSize={satValPickerSliderSize}
          sliderBorderColor={sliderBorderColor}
          hue={satValPickerHue}
          saturation={satValPickerSaturation}
          value={satValPickerValue}
          onDragStart={onSatValPickerDragStart}
          onDragMove={onSatValPickerDragMove}
          onDragEnd={onSatValPickerDragEnd}
          onDragTerminate={onSatValPickerDragTerminate}
          onPress={onSatValPickerPress}
        />
        <HuePicker
          containerStyle={huePickerContainerStyle}
          borderRadius={huePickerBorderRadius}
          hue={huePickerHue}
          barWidth={huePickerBarWidth}
          barHeight={huePickerBarHeight}
          sliderSize={huePickerSliderSize}
          sliderBorderColor={sliderBorderColor}
          onDragStart={onHuePickerDragStart}
          onDragMove={onHuePickerDragMove}
          onDragEnd={onHuePickerDragEnd}
          onDragTerminate={onHuePickerDragTerminate}
          onPress={onHuePickerPress}
        />
      </View>
    );
  }
);

HsvColorPicker.displayName = 'HsvColorPicker';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HsvColorPicker;

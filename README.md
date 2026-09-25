# `@codexporer.io/react-native-hsv-color-picker`

> A React Native HSV (Hue, Saturation, Value) color picker component written in TypeScript with dynamic theming support.

Fork of [react-native-hsv-color-picker](https://github.com/yuanfux/react-native-hsv-color-picker), modernized with:
- Full **TypeScript** typing out of the box.
- Dynamic theme integration via [`@codexporer.io/expo-app-theme`](../codex-expo-app-theme).
- Modern React function components with `forwardRef` and hook-based gesture tracking.
- Completely removed legacy/deprecated modules (`prop-types`, `deprecated-react-native-prop-types`).

---

## Installation & Peer Dependencies

```bash
yarn add @codexporer.io/react-native-hsv-color-picker
yarn add chroma-js expo-linear-gradient
yarn add -D @types/chroma-js
```

Peer dependencies:
- `react` (`*`)
- `react-native` (`*`)
- `chroma-js` (`^2.1.0`)
- `@types/chroma-js` (`*`)
- `expo-linear-gradient` (`*`)
- `@codexporer.io/expo-app-theme` (`*`)

---

## Basic Usage

```tsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import HsvColorPicker, { HsvColorPickerRef } from '@codexporer.io/react-native-hsv-color-picker';

export const ColorPickerExample = () => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(1);
  const [value, setValue] = useState(1);
  const pickerRef = useRef<HsvColorPickerRef>(null);

  const handleHueChange = ({ hue }: { hue: number }) => {
    setHue(hue);
  };

  const handleSatValChange = ({
    saturation,
    value,
  }: {
    saturation: number;
    value: number;
  }) => {
    setSaturation(saturation);
    setValue(value);
  };

  return (
    <View style={styles.container}>
      <HsvColorPicker
        ref={pickerRef}
        huePickerHue={hue}
        onHuePickerDragMove={handleHueChange}
        onHuePickerPress={handleHueChange}
        satValPickerHue={hue}
        satValPickerSaturation={saturation}
        satValPickerValue={value}
        onSatValPickerDragMove={handleSatValChange}
        onSatValPickerPress={handleSatValChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ColorPickerExample;
```

---

## Theming

The component integrates with `@codexporer.io/expo-app-theme`. When wrapped in a `ThemeProvider`, it dynamically adapts:

- **Container Background**: Defaults to `theme.surface` (can be overridden with `backgroundColor` or `containerStyle`).
- **Container Borders**: Defaults to `theme.border` (can be overridden with `borderColor`).
- **Slider Thumbs**: Indicator borders default to `theme.border` with drop shadows matching `theme.shadow` (can be overridden with `sliderBorderColor`).

---

## API Reference

### `HsvColorPickerProps`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `containerStyle` | `StyleProp<ViewStyle>` | `undefined` | Custom style for the outer container |
| `backgroundColor` | `string` | `theme.surface` | Background color for the picker container |
| `borderColor` | `string` | `theme.border` | Border color for the picker container |
| `sliderBorderColor` | `string` | `theme.border` | Border color for both the hue and sat/val thumbs |

#### Saturation & Value Picker Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `satValPickerHue` | `number` | `0` | Current hue (0–360) |
| `satValPickerSaturation` | `number` | `1` | Current saturation (0–1) |
| `satValPickerValue` | `number` | `1` | Current brightness value (0–1) |
| `satValPickerSize` | `number` | `200` | Width and height of the saturation/value canvas |
| `satValPickerSliderSize` | `number` | `24` | Diameter of the thumb indicator |
| `satValPickerBorderRadius`| `number` | `0` | Border radius of the saturation/value canvas |
| `satValPickerContainerStyle` | `StyleProp<ViewStyle>` | `undefined` | Custom style for the sat/val container |
| `onSatValPickerDragStart` | `(event: SatValPickerDragEvent) => void` | `undefined` | Drag start callback |
| `onSatValPickerDragMove` | `(event: SatValPickerDragEvent) => void` | `undefined` | Drag move callback |
| `onSatValPickerDragEnd` | `(event: SatValPickerDragEvent) => void` | `undefined` | Drag release callback |
| `onSatValPickerDragTerminate` | `(event: SatValPickerDragEvent) => void` | `undefined` | Drag cancellation callback |
| `onSatValPickerPress` | `(event: SatValPickerPressEvent) => void` | `undefined` | Press callback on the canvas |

#### Hue Picker Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `huePickerHue` | `number` | `0` | Current hue (0–360) |
| `huePickerBarWidth` | `number` | `12` | Width of the vertical hue strip |
| `huePickerBarHeight` | `number` | `200` | Height of the vertical hue strip |
| `huePickerSliderSize` | `number` | `24` | Diameter of the hue thumb indicator |
| `huePickerBorderRadius` | `number` | `0` | Border radius of the hue gradient strip |
| `huePickerContainerStyle` | `StyleProp<ViewStyle>` | `undefined` | Custom style for the hue picker container |
| `onHuePickerDragStart` | `(event: HuePickerDragEvent) => void` | `undefined` | Drag start callback |
| `onHuePickerDragMove` | `(event: HuePickerDragEvent) => void` | `undefined` | Drag move callback |
| `onHuePickerDragEnd` | `(event: HuePickerDragEvent) => void` | `undefined` | Drag release callback |
| `onHuePickerDragTerminate` | `(event: HuePickerDragEvent) => void` | `undefined` | Drag cancellation callback |
| `onHuePickerPress` | `(event: HuePickerPressEvent) => void` | `undefined` | Press callback on the hue strip |

---

### Ref Methods (`HsvColorPickerRef`)

| Method | Return Type | Description |
| :--- | :--- | :--- |
| `getCurrentColor()` | `string` | Returns the current color formatted as a hex string (e.g. `#ff007f`) |

```tsx
const pickerRef = useRef<HsvColorPickerRef>(null);

// Get current hex color programmatically
const currentHex = pickerRef.current?.getCurrentColor();
```

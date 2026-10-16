---
name: react-native-hsv-color-picker
description: Instructions and guidelines for using @codexporer.io/react-native-hsv-color-picker (React Native HSV Color Picker) in React Native and Expo applications.
---

# `@codexporer.io/react-native-hsv-color-picker` Skill

## Overview
`@codexporer.io/react-native-hsv-color-picker` provides a visual HSV color selection canvas. It combines a 2D saturation/value gradient square with an adjacent hue strip slider and ref-based hex color extraction.

---

## When to Use
- Palette and tint selection in photo filters, text color pickers, or drawing canvas toolbars.
- Custom theme accent picking.

---

## Usage Example

```tsx
import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import HsvColorPicker from '@codexporer.io/react-native-hsv-color-picker';

type HsvColorPickerRef = React.ElementRef<typeof HsvColorPicker>;

export function ColorChooser() {
  const pickerRef = useRef<HsvColorPickerRef>(null);
  const [color, setColor] = useState('#01579B');

  const handleUpdate = () => {
    const hex = pickerRef.current?.getCurrentColor();
    if (hex) {
      setColor(hex);
    }
  };

  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Text style={{ marginBottom: 12 }}>Selected: {color}</Text>
      <HsvColorPicker
        ref={pickerRef}
        onHuePickerDragMove={handleUpdate}
        onSatValPickerDragMove={handleUpdate}
      />
    </View>
  );
}
```

---

## API Reference

### `<HsvColorPicker />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HsvColorPickerRef>` | — | Ref exposing `getCurrentColor(): string` |
| `backgroundColor` | `string` | `theme.surface` | Background color for container |
| `borderColor` | `string` | `theme.border` | Border color for container |
| `sliderBorderColor` | `string` | `theme.border` | Border color for slider thumb handles |
| `containerStyle` | `StyleProp<ViewStyle>` | — | Outer wrapper style override |
| `huePickerHue` | `number` | `0` | Current hue angle (0–360) |
| `huePickerBarWidth` | `number` | `12` | Width of vertical hue slider strip |
| `huePickerBarHeight` | `number` | `200` | Height of vertical hue slider strip |
| `huePickerSliderSize` | `number` | `24` | Diameter of hue slider thumb knob |
| `huePickerBorderRadius` | `number` | `0` | Corner radius of hue gradient strip |
| `onHuePickerDragMove` | `(event: { hue: number, gestureState }) => void` | — | Callback fired continuously while dragging hue slider |
| `onHuePickerPress` | `(event: { hue: number, nativeEvent }) => void` | — | Callback fired when tapping hue strip |
| `satValPickerHue` | `number` | `0` | Hue angle applied to saturation/value canvas |
| `satValPickerSaturation` | `number` | `1` | Current saturation (0–1) |
| `satValPickerValue` | `number` | `1` | Current brightness value (0–1) |
| `satValPickerSize` | `number` | `200` | Width and height of 2D saturation/value canvas |
| `satValPickerSliderSize` | `number` | `24` | Diameter of saturation/value thumb knob |
| `satValPickerBorderRadius` | `number` | `0` | Corner radius of canvas |
| `onSatValPickerDragMove` | `(event: { saturation: number, value: number, gestureState }) => void` | — | Callback fired continuously while dragging saturation/value pad |
| `onSatValPickerPress` | `(event: { saturation: number, value: number, nativeEvent }) => void` | — | Callback fired when tapping saturation/value canvas |

---

## Critical Rules & Guidelines
1. **Default Export**: Must be imported as default: `import HsvColorPicker from '@codexporer.io/react-native-hsv-color-picker'`.
2. **Ref Extraction**: Use `ref.current?.getCurrentColor()` to get the calculated `#RRGGBB` hex string.
3. **Event Payloads**: Callbacks receive objects: `{ hue }` for hue picker events, and `{ saturation, value }` for saturation/value picker events.
4. **Theme Tokens**: Surface and border colors default to `theme.surface` and `theme.border` from `@codexporer.io/expo-app-theme`.
5. **Peer Dependencies**: Requires `react`, `react-native`, `chroma-js`, `expo-linear-gradient`, and `@codexporer.io/expo-app-theme`.

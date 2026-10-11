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
| `ref` | `Ref<React.ElementRef<typeof HsvColorPicker>>` | — | Ref exposing `getCurrentColor(): string` |
| `huePickerHue` | `number` | `0` | Initial hue angle (0-360) |
| `satValPickerSaturation` | `number` | `1` | Initial saturation (0-1) |
| `satValPickerValue` | `number` | `1` | Initial value/brightness (0-1) |
| `onHuePickerDragMove` | `(event) => void` | — | Callback fired continuously while dragging hue slider |
| `onSatValPickerDragMove` | `(event) => void` | — | Callback fired continuously while dragging saturation/value pad |
| `satValPickerSize` | `number` | `200` | Width and height of 2D saturation/value square |
| `huePickerBarWidth` | `number` | `12` | Width of hue slider strip |
| `huePickerBarHeight` | `number` | `200` | Height of hue slider strip |

---

## Critical Rules & Guidelines
1. **Ref Extraction**: Use `ref.current?.getCurrentColor()` to get the calculated `#RRGGBB` hex string.
2. **Default Export**: Must be imported as default export: `import HsvColorPicker from '@codexporer.io/react-native-hsv-color-picker'`.

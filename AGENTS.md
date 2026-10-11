# AGENTS.md — `@codexporer.io/react-native-hsv-color-picker`

## Package Overview
High-performance visual HSV (Hue, Saturation, Value) color picker using `chroma-js`, `expo-linear-gradient`, and pan gesture handling.

## Key Exports
- `default HsvColorPicker`: Main color picker component with hue slider and saturation/value 2D pad.
- Ref handle type: Extracted via `type HsvColorPickerRef = React.ElementRef<typeof HsvColorPicker>`, providing `getCurrentColor(): string` (hex).
- Props type: Extracted via `type HsvColorPickerProps = React.ComponentProps<typeof HsvColorPicker>`.

## Critical Guidelines for AI Agents
- Import as default: `import HsvColorPicker from '@codexporer.io/react-native-hsv-color-picker';`.
- Type the ref using `React.ElementRef<typeof HsvColorPicker>` (named types are not exported directly from the entry point).
- To track color changes in state, listen to `onHuePickerDragMove` and `onSatValPickerDragMove`, or attach a `ref` and call `ref.current?.getCurrentColor()`.
- Theme tokens: Border and background colors default to `theme.border` and `theme.surface`.

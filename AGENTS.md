# AGENTS.md — `@codexporer.io/react-native-hsv-color-picker`

## Package Overview
Visual HSV (Hue, Saturation, Value) color picker combining a 2D saturation/value gradient canvas with an adjacent vertical hue slider strip. Implemented with React Native `PanResponder`, `expo-linear-gradient`, `chroma-js`, and theme tokens from `@codexporer.io/expo-app-theme`.

## Peer Dependencies
```json
{
  "react": "*",
  "react-native": "*",
  "chroma-js": "*",
  "expo-linear-gradient": "*",
  "@codexporer.io/expo-app-theme": "*"
}
```

## TypeScript Contracts (`src/HsvColorPicker.tsx`)

```typescript
export interface HsvColorPickerRef {
  getCurrentColor: () => string; // Returns hex string (e.g. '#ff007f')
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
  onHuePickerDragStart?: (event: { hue: number; gestureState: PanResponderGestureState }) => void;
  onHuePickerDragMove?: (event: { hue: number; gestureState: PanResponderGestureState }) => void;
  onHuePickerDragEnd?: (event: { hue: number; gestureState: PanResponderGestureState }) => void;
  onHuePickerDragTerminate?: (event: { hue: number; gestureState: PanResponderGestureState }) => void;
  onHuePickerPress?: (event: { hue: number; nativeEvent: GestureResponderEvent['nativeEvent'] }) => void;

  satValPickerContainerStyle?: StyleProp<ViewStyle>;
  satValPickerBorderRadius?: number;
  satValPickerSize?: number;
  satValPickerSliderSize?: number;
  satValPickerHue?: number;
  satValPickerSaturation?: number;
  satValPickerValue?: number;
  onSatValPickerDragStart?: (event: { saturation: number; value: number; gestureState: PanResponderGestureState }) => void;
  onSatValPickerDragMove?: (event: { saturation: number; value: number; gestureState: PanResponderGestureState }) => void;
  onSatValPickerDragEnd?: (event: { saturation: number; value: number; gestureState: PanResponderGestureState }) => void;
  onSatValPickerDragTerminate?: (event: { saturation: number; value: number; gestureState: PanResponderGestureState }) => void;
  onSatValPickerPress?: (event: { saturation: number; value: number; nativeEvent: GestureResponderEvent['nativeEvent'] }) => void;
}
```

## Key Exports
- `default HsvColorPicker`: Default export from `src/index.ts`.
- Ref handle: `HsvColorPickerRef` exposing `getCurrentColor(): string` (or extracted via `type HsvColorPickerRef = React.ElementRef<typeof HsvColorPicker>`).

## Component Behavior & Defaults
- **Default Import Only**: `src/index.ts` only exports `export default HsvColorPicker;`. Always import via `import HsvColorPicker from '@codexporer.io/react-native-hsv-color-picker';`.
- **Defaults**:
  - `huePickerHue = 0`, `huePickerBarWidth = 12`, `huePickerBarHeight = 200`, `huePickerSliderSize = 24`, `huePickerBorderRadius = 0`
  - `satValPickerHue = 0`, `satValPickerSaturation = 1`, `satValPickerValue = 1`, `satValPickerSize = 200`, `satValPickerSliderSize = 24`, `satValPickerBorderRadius = 0`
- **Theming**:
  - `backgroundColor` defaults to `theme.surface`.
  - `borderColor` defaults to `theme.border`.
  - `sliderBorderColor` defaults to `theme.border`.
  - Slider thumbs render with shadow matching `theme.shadow`.

## Critical Guidelines for AI Agents
- **Import as default**: `import HsvColorPicker from '@codexporer.io/react-native-hsv-color-picker';`. Do not use named import `{ HsvColorPicker }` from the package root.
- **Color Extraction**: Read hex color via `pickerRef.current?.getCurrentColor()` or subscribe to drag/press events.
- **Event Callbacks**: Note that callbacks receive object parameters (`{ hue }` for hue picker, and `{ saturation, value }` for saturation/value picker).

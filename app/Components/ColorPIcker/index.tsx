import { useState } from "react";
import Color from "color";
import { ColorPicker as Picker } from "@shopify/polaris";
import type { HSBAColor } from "@shopify/polaris";

interface Props {
  initialColor: string; // HEX value
  onChange?: (newColor: string) => void;
}

type HsvColor = {
  hue: number;
  saturation: number;
  brightness: number;
};

export const hexToHsv = (hex: string): HsvColor => {
  const hsv = Color(hex).hsv().array();

  const rounded = {
    hue: hsv[0],
    saturation: Math.round(hsv[1]),
    brightness: Math.round(hsv[2]),
  };

  return {
    hue: rounded.hue,
    saturation: rounded.saturation / 100,
    brightness: rounded.brightness / 100,
  };
};

export const hsvToHex = (hsv: HsvColor) => {
  const formatted = {
    h: hsv.hue,
    s: hsv.saturation * 100,
    l: hsv.brightness * 100,
  };

  return Color.hsv([formatted.h, formatted.s, formatted.l]).hex();
};

const ColorPicker = ({ initialColor, onChange }: Props) => {
  const [color, setColor] = useState(initialColor);

  const onColorChange = (newColor: HSBAColor) => {
    const newHex = hsvToHex(newColor);
    setColor(newHex);
    onChange?.(newHex);
  };

  return <Picker onChange={onColorChange} color={hexToHsv(color || "")} />;
};

export default ColorPicker;

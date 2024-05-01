import type { State } from "~/containers/Settings/types";
import type { Settings } from "~/types";

export const isChanged = (settings?: Settings, state?: State) => {
  if (!settings || !state) return false;
  if (
    state.duration !== settings.display.duration ||
    state.animationIn !== settings.display.animationIn ||
    state.animationOut !== settings.display.animationOut ||
    state.message !== settings.text.content ||
    state.specialColor !== settings.text.specialColor ||
    state.imageFileName !== settings.image.fileName ||
    state.audioFileName !== settings.audio.fileName ||
    state.imageBase64 !== settings.image.base64 ||
    state.audioBase64 !== settings.audio.base64 ||
    state.volume !== settings.audio.volume
  ) {
    return true;
  }
};

export const buildSettingsFromState = (state: State, settings?: Settings) => {
  if (!settings) return null;

  return {
    ...settings,
    text: {
      content: state.message || settings.text.content,
      specialColor: state.specialColor || settings.text.specialColor,
    },
    display: {
      duration: state.duration || settings.display.duration,
      animationIn: state.animationIn || settings.display.animationIn,
      animationOut: state.animationOut || settings.display.animationOut,
    },
    audio: {
      fileName: state.audioFileName || settings.audio.fileName,
      volume: state.volume || settings.audio.volume,
      base64: state.audioBase64 || settings.audio.base64,
    },
    image: {
      fileName: state.imageFileName || settings.image.fileName,
      base64: state.imageBase64 || settings.image.base64,
    },
  };
};

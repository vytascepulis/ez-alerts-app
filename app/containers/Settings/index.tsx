import {
  BlockStack,
  Button,
  Card,
  Divider,
  RangeSlider,
  Select,
  TextField,
} from "@shopify/polaris";
import useMergeState from "~/hooks/useMergeState";
import { useOutletContext } from "react-router";
import type { Context } from "~/types";
import { animationsIn, animationsOut } from "~/containers/Main/constants";
import ColorPicker from "~/components/ColorPicker";
import Buttons from "~/containers/Settings/Buttons";
import FileUpload from "~/containers/Settings/FileUpload";

const Settings = () => {
  const { settings, uuid, ENV } = useOutletContext<Context>();

  const [state, setState] = useMergeState({
    duration: settings?.display.duration || 0,
    animationIn: settings?.display.animationIn,
    animationOut: settings?.display.animationOut,
    message: settings?.text.content,
    specialColor: settings?.text.specialColor,
    imageFileName: settings?.image.fileName,
    audioFileName: settings?.audio.fileName,
    imageBase64: settings?.image.base64,
    audioBase64: settings?.audio.base64,
    volume: settings?.audio.volume,
  });

  const browserSrc = `${ENV.EZALERTS_CLIENT_URL}#${uuid}`;

  const onCopySrc = () => {
    navigator.clipboard.writeText(browserSrc ?? "").then(() => {
      shopify.toast.show("Browser source copied!");
    });
  };

  const onFieldChange = (field: string, value: string | number) => {
    setState({ [field]: value });
  };

  return (
    <Card>
      <BlockStack gap="600">
        <Buttons browserSrc={browserSrc} />
        <BlockStack gap="400">
          <TextField
            label="Browser source"
            autoComplete="off"
            readOnly
            value={browserSrc}
            type={"password"}
            suffix={
              <Button variant="plain" onClick={onCopySrc}>
                Copy
              </Button>
            }
          />
          <Divider borderColor="border" />
          <TextField
            label="Message template"
            autoComplete="off"
            value={state.message}
            onChange={(value) => onFieldChange("message", value)}
            multiline
          />
          <ColorPicker
            onChange={(color) => onFieldChange("specialColor", color)}
            initialColor={state.specialColor || ""}
          />
          <Select
            label="Animation in"
            options={animationsIn}
            onChange={(value) => onFieldChange("animationIn", value)}
            value={state.animationIn}
          />
          <Select
            label="Animation out"
            options={animationsOut}
            onChange={(value) => onFieldChange("animationOut", value)}
            value={state.animationOut}
          />
          <RangeSlider
            output
            label="Alert duration (seconds)"
            min={1}
            max={15}
            value={state.duration / 1000}
            onChange={(value) =>
              onFieldChange("duration", (value as number) * 1000)
            }
          />
          <Divider borderColor="border" />
          <FileUpload
            audioFileName={state.audioFileName}
            imageFileName={state.imageFileName}
            onChange={onFieldChange}
          />
          <RangeSlider
            output
            label="Volume"
            min={1}
            max={100}
            value={state.volume || 0}
            onChange={(value) => onFieldChange("volume", value as number)}
          />
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

export default Settings;

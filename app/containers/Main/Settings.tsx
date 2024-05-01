import {
  BlockStack,
  Button,
  Card,
  Divider,
  DropZone,
  InlineStack,
  RangeSlider,
  Select,
  TextField,
} from "@shopify/polaris";
import useMergeState from "~/hooks/useMergeState";
import { useOutletContext } from "react-router";
import type { Context } from "~/types";
import { animationsIn, animationsOut } from "~/containers/Main/constants";
import ColorPicker from "~/components/ColorPicker";

const Settings = () => {
  const { settings, uuid, ENV } = useOutletContext<Context>();

  const [state, setState] = useMergeState({
    isSrcShown: false,
    duration: settings?.display.duration || 0,
    animationIn: settings?.display.animationIn,
    animationOut: settings?.display.animationOut,
    message: settings?.text.content,
    specialColor: settings?.text.specialColor,
  });

  const browserSrc = `${ENV.EZALERTS_CLIENT_URL}#${uuid}`;

  const onCopySrc = () => {
    navigator.clipboard.writeText(browserSrc ?? "").then(() => {
      shopify.toast.show("Browser source copied!");
    });
  };

  const handleTestAlert = () => {
    console.log("test", state.specialColor);
  };

  const onDurationChange = (value: number) => {
    setState({ duration: value * 1000 });
  };

  const onColorChange = (color: string) => {
    setState({
      specialColor: color,
    });
  };

  return (
    <Card>
      <BlockStack gap="600">
        <InlineStack>
          <Button onClick={handleTestAlert}>Test alert</Button>
        </InlineStack>
        <BlockStack gap="400">
          <TextField
            label="Browser source"
            autoComplete="off"
            readOnly
            value={browserSrc}
            type={"password"}
            suffix={
              <>
                <Button variant="plain" onClick={onCopySrc}>
                  Copy
                </Button>
              </>
            }
          />
          <Divider />
          <TextField
            label="Message template"
            autoComplete="off"
            value={state.message}
            onChange={(value) => setState({ message: value })}
            multiline
          />
          <ColorPicker
            onChange={onColorChange}
            initialColor={state.specialColor || ""}
          />
          <Select
            label="Animation in"
            options={animationsIn}
            onChange={(value) => setState({ animationIn: value })}
            value={state.animationIn}
          />
          <Select
            label="Animation out"
            options={animationsOut}
            onChange={(value) => setState({ animationOut: value })}
            value={state.animationOut}
          />
          <RangeSlider
            output
            label="Alert duration (seconds)"
            min={1}
            max={30}
            value={state.duration / 1000}
            onChange={onDurationChange}
          />
          <Divider />
          <div style={{ width: 60, height: 60 }}>
            <DropZone allowMultiple={false}>
              <DropZone.FileUpload />
            </DropZone>
          </div>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

export default Settings;

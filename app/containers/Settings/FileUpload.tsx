import { Button, TextField } from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";
import { useRef } from "react";
import useMergeState from "~/hooks/useMergeState";

interface Props {
  imageFileName?: string;
  audioFileName?: string;
  onChange: (field: string, value: string) => void;
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const imageFileTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const audioFileTypes = ["audio/mpeg", "audio/wav"];

const validateFileType = (file: File, fileTypes: string[]) => {
  if (!fileTypes.includes(file.type)) {
    throw new Error("Invalid file type");
  }
};

const FileUpload = ({ imageFileName, audioFileName, onChange }: Props) => {
  const [state, setState] = useMergeState({
    isImageError: false,
    isAudioError: false,
  });

  const refAlertImageInput = useRef<HTMLInputElement>(null);
  const refAlertAudioInput = useRef<HTMLInputElement>(null);

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ isImageError: false });
    const file = e.currentTarget.files?.[0];

    if (file) {
      try {
        validateFileType(file, imageFileTypes);
        const base64 = await toBase64(file);

        onChange("imageFileName", file.name);
        onChange("imageBase64", base64 as string);
      } catch (e) {
        setState({ isImageError: true });
      }
    }
  };

  const onAudioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ isAudioError: false });
    const file = e.currentTarget.files?.[0];

    if (file) {
      try {
        validateFileType(file, audioFileTypes);
        const base64 = await toBase64(file);

        onChange("audioFileName", file.name);
        onChange("audioBase64", base64 as string);
      } catch (e) {
        setState({ isAudioError: true });
      }
    }
  };

  return (
    <>
      <TextField
        label="Alert image"
        autoComplete="off"
        readOnly
        value={imageFileName}
        error={state.isImageError ? "Invalid file type selected" : undefined}
        suffix={
          <Button
            variant="plain"
            icon={EditIcon}
            onClick={() => refAlertImageInput.current?.click()}
          >
            Edit
          </Button>
        }
      />
      <TextField
        label="Alert sound"
        autoComplete="off"
        readOnly
        value={audioFileName}
        error={state.isAudioError ? "Invalid file type selected" : undefined}
        suffix={
          <Button
            variant="plain"
            icon={EditIcon}
            onClick={() => refAlertAudioInput.current?.click()}
          >
            Edit
          </Button>
        }
      />
      <input
        ref={refAlertImageInput}
        onChange={onImageChange}
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg, image/gif"
      />
      <input
        ref={refAlertAudioInput}
        onChange={onAudioChange}
        type="file"
        hidden
        accept="audio/wav, audio/mpeg"
      />
    </>
  );
};

export default FileUpload;

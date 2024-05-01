import { useOutletContext } from "react-router";
import type { Context, UserData } from "~/types";
import type { State } from "~/containers/Settings/types";
import { useEffect, useRef } from "react";
import { buildSettingsFromState, isChanged } from "~/containers/Settings/utils";
import useMutation from "~/hooks/useMutation";

interface Props {
  state: State;
  setState: (state: State) => void;
}

const SaveBar = ({ state, setState }: Props) => {
  const { settings, setUserData, ENV, uuid, isBlocked } =
    useOutletContext<Context>();

  const refState = useRef(state);
  const changed = isChanged(settings, state);

  const onSaveChangesSuccess = () => {
    const newSettings = buildSettingsFromState(state, settings);

    if (newSettings) {
      refState.current = state;
      shopify.toast.show("Changes saved successfully");
      setUserData({
        isBlocked,
        uuid,
        settings: newSettings,
      });
    }
  };

  const { mutate, isLoading } = useMutation<{
    message: string;
    data: UserData;
  }>({
    key: "update-settings-mutation",
    endpoint: `${ENV.EZALERTS_SERVER_URL}/settings/${uuid}`,
    method: "PUT",
    onError: (err) => shopify.toast.show(err.message, { isError: true }),
    onSuccess: onSaveChangesSuccess,
  });

  const discardChanges = () => {
    setState(refState.current);
  };

  const onSaveChanges = () => {
    const newSettings = buildSettingsFromState(state, settings);
    mutate({ ...newSettings });
  };

  useEffect(() => {
    if (changed) {
      shopify.saveBar.show("settings-save-bar");
    } else {
      shopify.saveBar.hide("settings-save-bar");
    }
  }, [changed]);

  return (
    <>
      <ui-save-bar id="settings-save-bar">
        <button
          variant="primary"
          id="save-button"
          onClick={onSaveChanges}
          disabled={isLoading}
        ></button>
        <button id="discard-button" onClick={discardChanges}></button>
      </ui-save-bar>
    </>
  );
};

export default SaveBar;

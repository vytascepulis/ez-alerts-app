import { Button, InlineStack } from "@shopify/polaris";
import useMutation from "~/hooks/useMutation";
import { useOutletContext } from "react-router";
import type { Context } from "~/types";

interface Props {
  browserSrc: string;
}

const Buttons = ({ browserSrc }: Props) => {
  const { uuid, ENV } = useOutletContext<Context>();

  const { mutate: fireTestAlert, isLoading: isAlertLoading } = useMutation({
    key: "firealert-mutation",
    endpoint: `${ENV.EZALERTS_SERVER_URL}/test-alert/${uuid}`,
    method: "POST",
    onError: (err) => shopify.toast.show(err.message, { isError: true }),
    onSuccess: () => shopify.toast.show("Test alert fired successfully!"),
  });

  const onOpenWidgetClick = () => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=700,height=600`;

    open(browserSrc, "testAlertWindow", params);
  };

  return (
    <InlineStack gap="200">
      <Button loading={isAlertLoading} onClick={() => fireTestAlert()}>
        Send test alert
      </Button>
      <Button onClick={onOpenWidgetClick}>Open widget</Button>
    </InlineStack>
  );
};

export default Buttons;

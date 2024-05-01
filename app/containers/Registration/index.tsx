import { Banner, BlockStack } from "@shopify/polaris";
import { useOutletContext } from "react-router";
import type { Context } from "~/types";

const Registration = () => {
  const { handleRegister, isRegisterLoading } = useOutletContext<Context>();

  return (
    <Banner
      tone="success"
      title="Welcome!"
      action={{
        content: "Register",
        loading: isRegisterLoading,
        onAction: handleRegister,
      }}
    >
      <BlockStack gap="200" inlineAlign="start">
        <p>
          In order to use EZ Alerts you need to register your shop to our system
        </p>
      </BlockStack>
    </Banner>
  );
};

export default Registration;

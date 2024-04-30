import { Banner, BlockStack, Button } from "@shopify/polaris";
import { useOutletContext } from "react-router";
import type { Context } from "~/types";

const Registration = () => {
  const { handleRegister, isRegisterLoading } = useOutletContext<Context>();

  return (
    <Banner tone="success" title="Welcome!">
      <BlockStack gap="200" inlineAlign="start">
        <p>
          In order to use EZ Alerts you need to register your shop to our system
        </p>
        <Button
          variant="primary"
          loading={isRegisterLoading}
          onClick={handleRegister}
        >
          Register
        </Button>
      </BlockStack>
    </Banner>
  );
};

export default Registration;

import { Banner, BlockStack } from "@shopify/polaris";

const BlockedNotification = () => {
  return (
    <Banner tone="critical" title="Account blocked">
      <BlockStack gap="200" inlineAlign="start">
        <p>Your account has been blocked!</p>
      </BlockStack>
    </Banner>
  );
};

export default BlockedNotification;

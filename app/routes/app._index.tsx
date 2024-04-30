import {
  Page,
  Layout,
  Card,
  Button,
  BlockStack,
  Banner,
} from "@shopify/polaris";
import { useOutletContext } from "react-router";
import type { Context } from "~/types";

export default function Index() {
  const { isRegistered, handleRegister, isRegisterLoading } =
    useOutletContext<Context>();

  const pageTitle = isRegistered ? "EZ Alerts" : "Register";

  return (
    <Page narrowWidth>
      <ui-title-bar title={pageTitle}></ui-title-bar>
      <BlockStack gap="500">
        {!isRegistered && (
          <Banner tone="success" title="Welcome!">
            <BlockStack gap="200" inlineAlign="start">
              <p>
                In order to use EZ Alerts you need to register your shop to our
                system
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
        )}
        {isRegistered && (
          <Layout>
            <Layout.Section>
              <Card>asd</Card>
            </Layout.Section>
          </Layout>
        )}
      </BlockStack>
    </Page>
  );
}

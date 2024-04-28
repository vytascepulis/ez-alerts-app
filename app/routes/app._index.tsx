import { useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Layout,
  Card,
  Button,
  BlockStack,
  Banner,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useUser } from "~/contexts/UserProvider";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const { general, handleRegister } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const onRegister = () => {
    setIsLoading(true);
    handleRegister(() => setIsLoading(false));
  };

  const pageTitle = general.isRegistered ? "EZ Alerts" : "Register";

  return (
    <Page narrowWidth>
      <ui-title-bar title={pageTitle}></ui-title-bar>
      <BlockStack gap="500">
        {!general.isRegistered && (
          <Banner tone="success" title="Welcome!">
            <BlockStack gap="200" inlineAlign="start">
              <p>
                In order to use EZ Alerts you need to register your shop to our
                system
              </p>
              <Button
                variant="primary"
                loading={isLoading}
                onClick={onRegister}
              >
                Register
              </Button>
            </BlockStack>
          </Banner>
        )}
        {general.isRegistered && (
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

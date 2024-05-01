import { Layout } from "@shopify/polaris";
import Sidebar from "~/containers/Main/Sidebar";
import Settings from "~/containers/Settings";

const Main = () => {
  return (
    <Layout>
      <Layout.Section>
        <Settings />
      </Layout.Section>
      <Layout.Section variant="oneThird">
        <Sidebar />
      </Layout.Section>
    </Layout>
  );
};

export default Main;

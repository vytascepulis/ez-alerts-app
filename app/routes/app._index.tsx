import { Page } from "@shopify/polaris";
import { useOutletContext } from "react-router";
import type { Context } from "~/types";
import Registration from "~/containers/Registration";
import Main from "~/containers/Main";
import BlockedNotification from "~/containers/BlockedNotification";

export default function Index() {
  const { isRegistered, isBlocked } = useOutletContext<Context>();
  const pageTitle = isRegistered
    ? "EZ Alerts control panel"
    : "Register your account";

  return (
    <Page narrowWidth={!isRegistered || isBlocked}>
      <ui-title-bar title={pageTitle}></ui-title-bar>
      {!isRegistered && <Registration />}
      {isBlocked && <BlockedNotification />}
      {isRegistered && !isBlocked && <Main />}
    </Page>
  );
}

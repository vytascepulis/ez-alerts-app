import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "~/shopify.server";
import Navigation from "~/components/Navigation";
import useMutation from "~/hooks/useMutation";
import useMergeState from "~/hooks/useMergeState";
import type { Context, UserData } from "~/types";
import { useOutletContext } from "react-router";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({
    apiKey: process.env.SHOPIFY_API_KEY || "",
  });
};

interface RegisterState {
  isRegistered: boolean;
  isRegisterFailed: boolean;
}

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();
  const data = useOutletContext<{
    userData: UserData;
    ENV: { [key: string]: string };
  }>();
  const { ENV } = data;

  const [registerState, setRegisterState] = useMergeState<RegisterState>({
    isRegistered: Boolean(data.userData),
    isRegisterFailed: false,
  });

  const [userData, setUserData] = useMergeState(data.userData);

  const onRegisterError = (err: string) => {
    shopify.toast.show(`Registration failed: ${err}`, { isError: true });
    setRegisterState({ isRegisterFailed: true });
  };

  const onRegisterSuccess = (data: UserData) => {
    shopify.toast.show("Registered successfully!");
    setUserData(data);
    setRegisterState({ isRegistered: true });
  };

  const { mutate, isLoading } = useMutation<{
    message: string;
    data: UserData;
  }>({
    key: "register-mutation",
    endpoint: `${ENV.EZALERTS_SERVER_URL}/register`,
    method: "POST",
    onError: (err) => onRegisterError(err.message),
    onSuccess: ({ data }) => onRegisterSuccess(data),
  });

  const handleRegister = () => {
    mutate({
      shopDomain: shopify.config.shop,
    });
  };

  const context: Context = {
    handleRegister,
    setUserData,
    isRegisterLoading: isLoading,
    isRegisterFailed: registerState.isRegisterFailed,
    isRegistered: registerState.isRegistered,
    uuid: userData?.uuid,
    isBlocked: Boolean(userData?.isBlocked),
    settings: userData?.settings,
    ENV: ENV,
  };

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Navigation />
      <Outlet context={context} />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

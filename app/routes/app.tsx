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
  const userData = useOutletContext<UserData>();
  const [registerState, setRegisterState] = useMergeState<RegisterState>({
    isRegistered: Boolean(userData),
    isRegisterFailed: false,
  });

  const onRegisterError = (err: string) => {
    shopify.toast.show(`Registration failed: ${err}`);
    setRegisterState({ isRegisterFailed: true });
  };

  const onRegisterSuccess = () => {
    shopify.toast.show("Registered successfully!");
    setRegisterState({ isRegistered: true });
  };

  const { mutate, isLoading } = useMutation<{ message: string }>({
    key: "register-mutation",
    endpoint: "register",
    method: "POST",
    onError: (err) => onRegisterError(err.message),
    onSuccess: onRegisterSuccess,
  });

  const handleRegister = () => {
    mutate({
      shopDomain: shopify.config.shop,
    });
  };

  const context: Context = {
    handleRegister,
    isRegisterLoading: isLoading,
    isRegisterFailed: registerState.isRegisterFailed,
    isRegistered: registerState.isRegistered,
    uuid: userData?.uuid,
    isBlocked: Boolean(userData?.isBlocked),
    settings: userData?.settings,
  };

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Navigation showFullNav={context.isRegistered && !context.isBlocked} />
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

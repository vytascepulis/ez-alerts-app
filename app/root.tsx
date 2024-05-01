import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const { shop } = session;
  const { pathname, href } = new URL(request.url);
  let userData;

  const data = await fetch(
    `${process.env.EZALERTS_SERVER_URL}/settings-full/${shop}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  if (!data.ok) {
    userData = null;
  } else {
    userData = await data.json();
  }

  if ((!userData || !data.ok || userData?.isBlocked) && pathname !== "/app") {
    const newUrl = new URL(href);
    newUrl.pathname = "/app";

    throw redirect(newUrl.href);
  } else {
    return json({
      userData,
      ENV: {
        EZALERTS_CLIENT_URL: process.env.EZALERTS_CLIENT_URL,
        EZALERTS_SERVER_URL: process.env.EZALERTS_SERVER_URL,
      },
    });
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const { userData, ENV } = useLoaderData<typeof loader>();

  const context = {
    userData,
    ENV,
  };

  return (
    <html>
      <head>
        <title>EZ Alerts app</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet context={context} />
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}

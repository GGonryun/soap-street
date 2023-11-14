import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { NextPageContext } from "next";
import { AppRouter } from "../server";
import { getBaseUrl } from "@/util/urls";

export interface SSRContext extends NextPageContext {
  status?: number;
}

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createTRPCNext<AppRouter, SSRContext>({
  config({ ctx }) {
    return {
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,

          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }

            return ctx.req.headers;
          },
        }),
      ],
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },

  ssr: false,
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

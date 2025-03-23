import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import type { createStore } from '@wsh-2025/client/src/app/createStore';
import { Layout } from '@wsh-2025/client/src/features/layout/components/Layout';

export const prefetch = async (store: ReturnType<typeof createStore>) => {
  const user = await store.getState().features.auth.fetchUser();
  return { user };
};

export const Document = () => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <script src="/public/main.js" />
        <link href="https://wsh2025-a01sa01to.pages.dev/styles/reset.css" rel="stylesheet" />
        <link href="https://wsh2025-a01sa01to.pages.dev/styles/root.css" rel="stylesheet" />
      </head>
      <body>
        <Suspense>
          <Layout>
            <Outlet />
          </Layout>
        </Suspense>
        <ScrollRestoration />
      </body>
    </html>
  );
};

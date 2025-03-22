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
    <html lang="ja" style={{ height: '100%', width: '100%' }}>
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <script src="/public/main.js" />
      </head>
      <body style={{ backgroundColor: '#000000', color: '#ffffff', height: '100%', width: '100%' }}>
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

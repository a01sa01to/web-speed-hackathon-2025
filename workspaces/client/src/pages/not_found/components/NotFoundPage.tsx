import type { createStore } from '@wsh-2025/client/src/app/createStore';
import { RecommendedSection } from '@wsh-2025/client/src/features/recommended/components/RecommendedSection';
import { useRecommended } from '@wsh-2025/client/src/features/recommended/hooks/useRecommended';

export const prefetch = async (store: ReturnType<typeof createStore>) => {
  const modules = await store
    .getState()
    .features.recommended.fetchRecommendedModulesByReferenceId({ referenceId: 'error' });
  return { modules };
};

export const NotFoundPage = () => {
  const modules = useRecommended({ referenceId: 'error' });
  const module = modules.at(0);

  return (
    <>
      <title>見つかりません - AremaTV</title>

      <div style={{ padding: '48px 32px', width: '100%' }}>
        <section
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: '32px',
            rowGap: '20px',
            width: '100%',
          }}
        >
          <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 'bold' }}>
            ページが見つかりませんでした
          </h1>
          <p>あなたが見ようとしたページは、残念ながら見つけられませんでした。</p>
          <img
            alt=""
            height="360"
            src="https://wsh2025-a01sa01to.pages.dev/animations/001.gif"
            width="640"
          />
        </section>
        <section>{module != null ? <RecommendedSection module={module} /> : null}</section>
      </div>
    </>
  );
};

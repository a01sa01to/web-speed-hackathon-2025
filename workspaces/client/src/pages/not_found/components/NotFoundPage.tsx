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
      <div className="p-root">
        <section className="p-section">
          <h1 className="p-h1">
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

import type { createStore } from '@wsh-2025/client/src/app/createStore';
import { RecommendedSection } from '@wsh-2025/client/src/features/recommended/components/RecommendedSection';
import { useRecommended } from '@wsh-2025/client/src/features/recommended/hooks/useRecommended';

export const prefetch = async (store: ReturnType<typeof createStore>) => {
  const modules = await store
    .getState()
    .features.recommended.fetchRecommendedModulesByReferenceId({ referenceId: 'entrance' });
  return { modules };
};

export const HomePage = () => {
  const modules = useRecommended({ referenceId: 'entrance' });

  return (
    <>
      <title>Home - AremaTV</title>

      <div style={{ paddingBottom: "48px", paddingTop: "48px", width: '100%' }}>
        {modules.map((module) => {
          return (
            <div key={module.id} style={{ marginBottom: "24px", paddingLeft: "24px", paddingRight: "24px" }}>
              <RecommendedSection module={module} />
            </div>
          );
        })}
      </div>
    </>
  );
};

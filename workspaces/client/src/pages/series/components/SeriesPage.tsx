import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { type Params, useParams } from 'react-router';
import invariant from 'tiny-invariant';

import type { createStore } from '@wsh-2025/client/src/app/createStore';
import { RecommendedSection } from '@wsh-2025/client/src/features/recommended/components/RecommendedSection';
import { useRecommended } from '@wsh-2025/client/src/features/recommended/hooks/useRecommended';
import { SeriesEpisodeList } from '@wsh-2025/client/src/features/series/components/SeriesEpisodeList';
import { useSeriesById } from '@wsh-2025/client/src/features/series/hooks/useSeriesById';
import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

export const prefetch = async (store: ReturnType<typeof createStore>, { seriesId }: Params) => {
  invariant(seriesId);
  const series = await store.getState().features.series.fetchSeriesById({ seriesId });
  const modules = await store
    .getState()
    .features.recommended.fetchRecommendedModulesByReferenceId({ limit: 1, referenceId: seriesId });
  return { modules, series };
};

export const SeriesPage = () => {
  const { seriesId } = useParams();
  invariant(seriesId);

  const series = useSeriesById({ seriesId });
  invariant(series);

  const modules = useRecommended({ referenceId: seriesId });

  return (
    <>
      <title>{`${series.title} - AremaTV`}</title>

      <div style={{ margin: 'auto', padding: '48px 24px' }}>
        <header style={{ marginBottom: '24px', display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between', gap: '24px' }}>
          <Flipped stagger flipId={`series-${series.id}`}>
            <img
              alt=""
              style={{ height: 'auto', width: '400px', flexShrink: 0, flexGrow: 0, borderRadius: '8px', border: '2px solid #FFFFFF1F' }}
              decoding="sync" loading="eager" src={thumbUrl(series.thumbnailUrl, "lg")}
            />
          </Flipped>
          <div style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}>
            <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: 'bold', color: '#ffffff' }}>
              <Ellipsis ellipsis reflowOnResize maxLine={2} text={series.title} visibleLine={2} />
            </h1>
            <div style={{ fontSize: '14px', color: '#999999' }}>
              <Ellipsis ellipsis reflowOnResize maxLine={3} text={series.description} visibleLine={3} />
            </div>
          </div>
        </header>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '12px', fontSize: '22px', fontWeight: 'bold', color: '#ffffff' }}>エピソード</h2>
          <SeriesEpisodeList episodes={series.episodes} selectedEpisodeId={null} />
        </div>

        {modules[0] != null ? (
          <div>
            <RecommendedSection module={modules[0]} />
          </div>
        ) : null}
      </div>
    </>
  );
};

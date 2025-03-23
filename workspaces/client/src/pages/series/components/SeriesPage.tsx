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
      <link href="/public/styles/pages/series.css" rel="stylesheet" />

      <div className="r-root">
        <header className="r-header">
          <Flipped stagger flipId={`series-${series.id}`}>
            <img
              alt=""
              className="r-img"
              decoding="sync" loading="eager" src={thumbUrl(series.thumbnailUrl, "lg")}
            />
          </Flipped>
          <div className="r-div">
            <h1 className="r-h1">
              <Ellipsis ellipsis reflowOnResize maxLine={2} text={series.title} visibleLine={2} />
            </h1>
            <div className="r-div2">
              <Ellipsis ellipsis reflowOnResize maxLine={3} text={series.description} visibleLine={3} />
            </div>
          </div>
        </header>

        <div className="r-div3">
          <h2 className="r-h2">エピソード</h2>
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

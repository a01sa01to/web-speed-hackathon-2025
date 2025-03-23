import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { NavLink } from 'react-router';

import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

interface Props {
  episode: {
    description: string;
    id: string;
    premium: boolean;
    thumbnailUrl: string;
    title: string;
  };
  selected: boolean;
}

export const SeriesEpisodeItem = ({ episode, selected }: Props) => {
  return (
    <>
      <link href="https://wsh2025-a01sa01to.pages.dev/styles/feat/series/episode-item.css" rel="stylesheet" />

      <NavLink
        viewTransition
        className="m-link"
        to={`/episodes/${episode.id}`}
      >
        {({ isTransitioning }) => {
          return (
            <>
              <Flipped stagger flipId={!selected && isTransitioning ? `episode-${episode.id}` : 0}>
                <div className="m-div">
                  <img alt="" className="m-img" decoding="async" loading="lazy" src={thumbUrl(episode.thumbnailUrl, "sm")} />
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg className="m-svg" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" fill="currentColor" />
                  </svg>
                  {episode.premium ? (
                    <span className="m-span">
                      プレミアム
                    </span>
                  ) : null}
                </div>
              </Flipped>
              <div className="m-div2">
                <div className="m-div3">
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
                </div>
                <div className="m-div4">
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.description} visibleLine={2} />
                </div>
              </div>
            </>
          );
        }}
      </NavLink>
    </>
  );
};

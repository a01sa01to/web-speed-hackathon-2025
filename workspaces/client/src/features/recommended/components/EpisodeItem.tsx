import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { NavLink } from 'react-router';

import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

interface Props {
  episode: {
    id: string;
    premium: boolean;
    series: {
      title: string;
    };
    thumbnailUrl: string;
    title: string;
  };
}

export const EpisodeItem = ({ episode }: Props) => {
  return (<>
    <link href="https://wsh2025-a01sa01to.pages.dev/styles/feat/recommended/episode-item.css" rel="stylesheet" />

    <NavLink viewTransition className="i-link" to={`/episodes/${episode.id}`}>
      {({ isTransitioning }) => {
        return (
          <>
            <Flipped stagger flipId={isTransitioning ? `episode-${episode.id}` : 0}>
              <div className="i-div">
                <img alt="" className="i-img" decoding="async" loading="lazy" src={thumbUrl(episode.thumbnailUrl, "md")} />
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg className="i-svg" height={20} viewBox="0 0 24 24" width={20}
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" fill="currentColor" />
                </svg>
                {episode.premium ? (
                  <span className="i-span">
                    プレミアム
                  </span>
                ) : null}
              </div>
            </Flipped >
            <div className="i-p8">
              <div className="i-divd">
                <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
              </div>
              <div className="i-dive">
                <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.series.title} visibleLine={2} />
              </div>
            </div>
          </>
        );
      }}
    </NavLink>
  </>
  );
};

import { useId } from 'react';
import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { NavLink } from 'react-router';

import { Hoverable } from '@wsh-2025/client/src/features/layout/components/Hoverable';
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
  const uid = useId();

  return (
    <Hoverable classNames={{ hovered: 'opacity-75' }}>
      <NavLink viewTransition style={{ display: 'block', overflow: 'hidden', width: '100%' }} to={`/episodes/${episode.id}`}>
        {({ isTransitioning }) => {
          return (
            <>
              <Flipped stagger flipId={isTransitioning ? `episode-${episode.id}` : 0}>
                <div
                  className={uid}
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <style>
                    {`.${uid}::before {
                      position: absolute;
                      inset-x: 0;
                      bottom: 0;
                      display: block;
                      height: 64px;
                      background: linear-gradient(to top, #212121, transparent);
                      content: '';
                    }`}
                  </style>
                  <img alt="" decoding="async" loading="lazy" src={thumbUrl(episode.thumbnailUrl, "md")} style={{ height: 'auto', width: '100%' }} />
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg height="1em"
                    style={{
                      bottom: '4px',
                      color: '#ffffff',
                      display: 'block',
                      fontSize: '20px',
                      left: '4px',
                      margin: '4px',
                      position: 'absolute',
                    }} viewBox="0 0 24 24" width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" fill="currentColor" />
                  </svg>
                  {episode.premium ? (
                    <span
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#1c43d1',
                        borderRadius: '4px',
                        bottom: '8px',
                        color: '#ffffff',
                        display: 'inline-flex',
                        fontSize: '10px',
                        justifyContent: 'center',
                        padding: '4px',
                        position: 'absolute',
                        right: '4px',
                      }}
                    >
                      プレミアム
                    </span>
                  ) : null}
                </div>
              </Flipped >
              <div style={{ padding: '8px' }}>
                <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
                </div>
                <div style={{ color: '#999999', fontSize: '12px' }}>
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.series.title} visibleLine={2} />
                </div>
              </div>
            </>
          );
        }}
      </NavLink>
    </Hoverable >
  );
};

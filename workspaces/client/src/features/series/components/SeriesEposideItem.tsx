import { useId } from "react"
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
  const linkId = useId().replaceAll(":", "_")
  const divId = useId().replaceAll(":", "_")

  return (
    <>
      <style>{`
        .${linkId} {
          cursor: pointer;
          display: flex;
          width: 100%;
          flex-direction: row;
          align-items: start;
          justify-content: space-between;
          column-gap: 16px;
        }
        .${linkId}:hover {
          opacity: 0.75;
        }

        .${divId} {
          position: relative;
          flex-shrink: 0;
          flex-grow: 0;
          overflow: hidden;
          border-radius: 8px;
          border: 2px solid #FFFFFF1F;
        }
        .${divId}::before {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: block;
          height: 64px;
          background: linear-gradient(to top, #212121, transparent);
          content: '';
        }
      `}</style>
      <NavLink
        viewTransition
        className={linkId}
        to={`/episodes/${episode.id}`}
      >
        {({ isTransitioning }) => {
          return (
            <>
              <Flipped stagger flipId={!selected && isTransitioning ? `episode-${episode.id}` : 0}>
                <div className={divId}>
                  <img alt="" decoding="async" loading="lazy" src={thumbUrl(episode.thumbnailUrl, "sm")} style={{ aspectRatio: "16 / 9", height: "auto", width: "192px" }} />
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    style={{
                      bottom: '4px',
                      color: '#ffffff',
                      display: 'block',
                      height: '20px',
                      left: '4px',
                      margin: '4px',
                      position: "absolute",
                      width: '20px',
                    }} viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" fill="currentColor" />
                  </svg>
                  {episode.premium ? (
                    <span
                      style={{
                        alignItems: "center",
                        backgroundColor: "#1c43d1",
                        borderRadius: "4px",
                        bottom: "8px",
                        color: "#ffffff",
                        display: "inline-flex",
                        fontSize: "10px",
                        justifyContent: "center",
                        padding: "4px",
                        position: "absolute",
                        right: "4px",
                      }}
                    >
                      プレミアム
                    </span>
                  ) : null}
                </div>
              </Flipped>
              <div style={{ flexGrow: 1, flexShrink: 1 }}>
                <div style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
                </div>
                <div style={{ color: "#999999", fontSize: "12px" }}>
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

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
                <div className="relative shrink-0 grow-0 overflow-hidden rounded-[8px] border-[2px] border-solid border-[#FFFFFF1F] before:absolute before:inset-x-0 before:bottom-0 before:block before:h-[64px] before:bg-gradient-to-t before:from-[#212121] before:to-transparent before:content-['']">
                  <img alt="" className="h-auto w-[192px]" decoding="async" loading="lazy" src={thumbUrl(episode.thumbnailUrl, "sm")} />
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg height="1em"
                    style={{
                      bottom: '4px',
                      color: '#ffffff',
                      display: 'block',
                      fontSize: '20px',
                      left: '4px',
                      margin: '4px',
                      width: '20px',
                    }} viewBox="0 0 24 24" width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" fill="currentColor" />
                  </svg>
                  {episode.premium ? (
                    <span className="absolute bottom-[8px] right-[4px] inline-flex items-center justify-center rounded-[4px] bg-[#1c43d1] p-[4px] text-[10px] text-[#ffffff]">
                      プレミアム
                    </span>
                  ) : null}
                </div>
              </Flipped>

              <div className="grow-1 shrink-1">
                <div className="mb-[8px] text-[18px] font-bold text-[#ffffff]">
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
                </div>
                <div className="text-[12px] text-[#999999]">
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

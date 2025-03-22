import { useId } from "react"
import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { NavLink } from 'react-router';

import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

interface Props {
  series: {
    id: string;
    thumbnailUrl: string;
    title: string;
  };
}

export const SeriesItem = ({ series }: Props) => {
  const linkId = useId().replaceAll(":", "_")

  return (
    <>
      <style>{`
        .${linkId} {
          cursor: pointer;
          display: block;
          overflow: hidden;
          width: 100%;
        }
        .${linkId}:hover {
          opacity: 0.75;
        }
    `}</style>
      <NavLink viewTransition className={linkId} to={`/series/${series.id}`}>
        {({ isTransitioning }) => {
          return (
            <>
              <div
                style={{
                  borderColor: '#FFFFFF1F',
                  borderRadius: '8px',
                  borderStyle: 'solid',
                  borderWidth: '2px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Flipped stagger flipId={isTransitioning ? `series-${series.id}` : 0}>
                  <img alt="" decoding="async" loading="lazy" src={thumbUrl(series.thumbnailUrl, "md")} style={{ aspectRatio: "16 / 9", height: 'auto', width: '100%' }} />
                </Flipped>
              </div>
              <div style={{ padding: '8px' }}>
                <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold' }}>
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={series.title} visibleLine={2} />
                </div>
              </div>
            </>
          );
        }}
      </NavLink>
    </>
  );
};

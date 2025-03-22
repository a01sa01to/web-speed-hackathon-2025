import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { NavLink } from 'react-router';

import { Hoverable } from '@wsh-2025/client/src/features/layout/components/Hoverable';

interface Props {
  series: {
    id: string;
    thumbnailUrl: string;
    title: string;
  };
}

export const SeriesItem = ({ series }: Props) => {
  return (
    <Hoverable classNames={{ hovered: 'opacity-75' }}>
      <NavLink viewTransition style={{ display: 'block', overflow: 'hidden', width: '100%' }} to={`/series/${series.id}`}>
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
                  <img alt="" src={series.thumbnailUrl.split('?')[0] ?? ""} style={{ height: 'auto', width: '100%' }} />
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
    </Hoverable>
  );
};

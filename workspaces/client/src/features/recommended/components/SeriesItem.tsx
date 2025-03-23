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
  return (
    <>
      <NavLink viewTransition className="k-link" to={`/series/${series.id}`}>
        {({ isTransitioning }) => {
          return (
            <>
              <div className="k-div">
                <Flipped stagger flipId={isTransitioning ? `series-${series.id}` : 0}>
                  <img alt="" className='k-img' decoding="async" loading="lazy" src={thumbUrl(series.thumbnailUrl, "md")} />
                </Flipped>
              </div>
              <div className="k-div2">
                <div className="k-div3">
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

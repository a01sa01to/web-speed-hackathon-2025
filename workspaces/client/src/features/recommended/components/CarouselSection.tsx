import { ElementScrollRestoration } from '@epic-web/restore-scroll';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';
import type { ArrayValues } from 'type-fest';

import { EpisodeItem } from '@wsh-2025/client/src/features/recommended/components/EpisodeItem';
import { SeriesItem } from '@wsh-2025/client/src/features/recommended/components/SeriesItem'; import { useCarouselItemWidth } from '@wsh-2025/client/src/features/recommended/hooks/useCarouselItemWidth';

interface Props {
  module: ArrayValues<StandardSchemaV1.InferOutput<typeof schema.getRecommendedModulesResponse>>;
}

export const CarouselSection = ({ module }: Props) => {
  const { ref: containerRefForItemWidth, width: itemWidth } = useCarouselItemWidth();

  return (
    <>
      <link href="https://wsh2025-a01sa01to.pages.dev/styles/feat/recommended/carousel.css" rel="stylesheet" />

      <div className='h-root'>
        <h2 className="h-h2">{module.title}</h2>
        <div
          key={module.id}
          ref={containerRefForItemWidth}
          className="h-div"
          data-scroll-restore={`carousel-${module.id}`}
          style={{ '--item-width': `${itemWidth}px` }}
        >
          {module.items.map((item) => (
            <div key={item.id} className="h-container">
              {item.series != null ? <SeriesItem series={item.series} /> : null}
              {item.episode != null ? <EpisodeItem episode={item.episode} /> : null}
            </div>
          ))}
        </div>
      </div>

      <ElementScrollRestoration direction="horizontal" elementQuery={`[data-scroll-restore="carousel-${module.id}"]`} />
    </>
  );
};

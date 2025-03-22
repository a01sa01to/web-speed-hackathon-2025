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
      <div style={{ width: "100%" }}>
        <h2 style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "16px",
          width: "100%"
        }}>{module.title}</h2>
        <div
          key={module.id}
          ref={containerRefForItemWidth}
          data-scroll-restore={`carousel-${module.id}`}
          style={{
            // display: "grid",
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            // gridTemplateColumns: "repeat(auto-fill, minmax(276px, 1fr))",
            marginLeft: "-24px",
            marginRight: "-24px",
            overflowX: "auto",
            overflowY: "hidden",
            paddingLeft: "24px",
            paddingRight: '56px',
            position: "relative",
            scrollPaddingLeft: '24px',
            scrollSnapType: 'x mandatory',
          }}
        >
          {module.items.map((item) => (
            <div key={item.id} style={{ flexGrow: 0, flexShrink: 0, scrollSnapAlign: 'start', width: `${itemWidth}px` }}>
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

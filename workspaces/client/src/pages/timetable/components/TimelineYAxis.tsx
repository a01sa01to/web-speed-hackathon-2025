import type { ReactElement } from 'react';

export const TimelineYAxis = (): ReactElement => {
  const hours = Array.from({ length: 24 }, (_, hour) => {
    return (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={hour}
        className="s-timelinehour"
      >
        <span className="s-timeline-hs">
          {hour}
        </span>
      </div>
    );
  });
  return <div className="s-timeline">{hours}</div>;
};

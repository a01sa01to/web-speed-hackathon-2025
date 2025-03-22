import type { ReactElement } from 'react';

import { HEIGHT_ONE_HOUR } from '@wsh-2025/client/src/features/timetable/constants/grid_size';

export const TimelineYAxis = (): ReactElement => {
  const hours = Array.from({ length: 24 }, (_, hour) => {
    return (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={hour}
        style={{
          alignItems: 'center',
          backgroundColor: '#000000',
          borderBottom: '1px solid #212121',
          borderTop: '1px solid #212121',
          display: 'flex',
          flexGrow: 0,
          flexShrink: 0,
          height: `${HEIGHT_ONE_HOUR}px`,
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            flexGrow: 0,
            flexShrink: 0,
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {hour}
        </span>
      </div>
    );
  });
  return <div style={{ display: "flex", flexDirection: "column", width: "24px" }}>{hours}</div>;
};

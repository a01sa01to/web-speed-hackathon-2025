import { type PointerEvent, type ReactElement, useState } from 'react';

import { useChangeColumnWidth } from '@wsh-2025/client/src/pages/timetable/hooks/useChangeColumnWidth';

interface Props {
  channelId: string;
}

export const Gutter = ({ channelId }: Props): ReactElement => {
  const changeColumnWidth = useChangeColumnWidth();

  const [lastScreenX, setLastScreenX] = useState<number | null>(null);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setLastScreenX(event.screenX);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (lastScreenX == null) {
      return;
    }
    const delta = event.screenX - lastScreenX;
    changeColumnWidth({ channelId, delta: Math.ceil(delta) });
    setLastScreenX(event.screenX);
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (lastScreenX == null) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
    const delta = event.screenX - lastScreenX;
    changeColumnWidth({ channelId, delta: Math.ceil(delta) });
    setLastScreenX(null);
  };

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
    <div
      // biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
      role="slider"
      style={{
        cursor: 'col-resize',
        height: '100%',
        width: '100%',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
};

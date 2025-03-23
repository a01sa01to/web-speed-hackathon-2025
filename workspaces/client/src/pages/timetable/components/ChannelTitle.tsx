import invariant from 'tiny-invariant';

import { useChannelById } from '@wsh-2025/client/src/features/channel/hooks/useChannelById';
import { Gutter } from '@wsh-2025/client/src/pages/timetable/components/Gutter';
import { useColumnWidth } from '@wsh-2025/client/src/pages/timetable/hooks/useColumnWidth';

interface Props {
  channelId: string;
}

export const ChannelTitle = ({ channelId }: Props) => {
  const channel = useChannelById({ channelId });
  invariant(channel);

  const width = useColumnWidth(channelId);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          borderLeft: '1px solid #212121',
          borderRight: '1px solid #212121',
          height: '72px',
          padding: '14px',
          width,
        }}
      >
        <img
          alt={channel.name}
          draggable={false}
          height={60}
          src={channel.logoUrl.replace(
            '/public/',
            'https://wsh2025-a01sa01to.pages.dev/'
          ).replace(".svg", ".png")}
          style={{ height: '100%', objectFit: 'contain', width: '100%' }}
          width={280}
        />
      </div>

      <div
        style={{
          top: 0,
          bottom: 0,
          right: "-4px",
          position: 'absolute',
          width: '8px',
          zIndex: 10,
        }}
      >
        <Gutter channelId={channelId} />
      </div>
    </div>
  );
};

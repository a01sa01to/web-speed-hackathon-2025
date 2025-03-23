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
    <div className='s-title-container'>
      <div
        className="s-title-div"
        style={{ width }}
      >
        <img
          alt={channel.name}
          className="s-title-img"
          draggable={false}
          height={60}
          src={channel.logoUrl.replace(
            '/public/',
            'https://wsh2025-a01sa01to.pages.dev/'
          ).replace(".svg", ".png")}
          width={280}
        />
      </div>

      <div className="s-title-gutter-container">
        <Gutter channelId={channelId} />
      </div>
    </div>
  );
};

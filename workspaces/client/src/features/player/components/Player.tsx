import { type CSSProperties, type Ref, useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';
import { assignRef } from 'use-callback-ref';

import type { PlayerType } from '@wsh-2025/client/src/features/player/constants/player_type';
import type { PlayerWrapper } from '@wsh-2025/client/src/features/player/interfaces/player_wrapper';

interface Props {
  className?: string;
  loop?: boolean;
  playerRef: Ref<PlayerWrapper | null>;
  playerType: PlayerType;
  playlistUrl: string;
  style?: CSSProperties;
}

export const Player = ({ className, loop, playerRef, playerType, playlistUrl, style }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountElement = mountRef.current;
    invariant(mountElement);

    const abortController = new AbortController();
    let player: PlayerWrapper | null = null;

    void import('@wsh-2025/client/src/features/player/logics/create_player').then(({ createPlayer }) => {
      if (abortController.signal.aborted) {
        return;
      }
      player = createPlayer(playerType);
      player.load(playlistUrl, { loop: loop ?? false });
      mountElement.appendChild(player.videoElement);
      assignRef(playerRef, player);
    });

    return () => {
      abortController.abort();
      if (player != null) {
        mountElement.removeChild(player.videoElement);
        player.destory();
      }
      assignRef(playerRef, null);
    };
  }, [playerType, playlistUrl, loop]);

  return (
    <div className={className} style={style}>
      <div style={{ height: '100%', position: 'relative', width: '100%' }}>
        <div ref={mountRef} style={{ height: '100%', width: '100%' }} />

        <div
          style={{
            display: 'grid',
            inset: '0',
            placeContent: 'center',
            position: 'absolute',
            zIndex: -10,
          }}
        >
          <div
            className="i-line-md:loading-twotone-loop"
            style={{
              color: '#ffffff',
              height: '48px',
              width: '48px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';
import { useRef } from 'react';
import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { NavLink } from 'react-router';
import invariant from 'tiny-invariant';
import type { ArrayValues } from 'type-fest';

import { Player } from '../../player/components/Player';
import { PlayerType } from '../../player/constants/player_type';
import type { PlayerWrapper } from '../../player/interfaces/player_wrapper';

import { Hoverable } from '@wsh-2025/client/src/features/layout/components/Hoverable';

interface Props {
  module: ArrayValues<StandardSchemaV1.InferOutput<typeof schema.getRecommendedModulesResponse>>;
}

export const JumbotronSection = ({ module }: Props) => {
  const playerRef = useRef<PlayerWrapper>(null);

  const episode = module.items[0]?.episode;
  invariant(episode);

  return (
    <Hoverable classNames={{ hovered: 'opacity-50' }}>
      <NavLink
        viewTransition
        style={{
          alignItems: 'center',
          backgroundColor: '#171717',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'row',
          height: '260px',
          justifyContent: 'center',
          overflow: 'hidden',
          width: '100%',
        }}
        to={`/episodes/${episode.id}`}
      >
        {({ isTransitioning }) => {
          return (
            <>
              <div style={{ flexGrow: 1, flexShrink: 1, padding: '24px' }}>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
                </div>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  <Ellipsis ellipsis reflowOnResize maxLine={3} text={episode.description} visibleLine={3} />
                </div>
              </div>

              <Flipped stagger flipId={isTransitioning ? `episode-${episode.id}` : 0}>
                <div style={{ aspectRatio: "16 / 9", flexGrow: 0, flexShrink: 0, height: '100%', width: 'auto' }}>
                  <Player
                    loop
                    playerRef={playerRef}
                    playerType={PlayerType.ShakaPlayer}
                    playlistUrl={`/streams/episode/${episode.id}/playlist.m3u8`}
                    style={{ height: '100%', width: '100%' }}
                  />
                </div>
              </Flipped>
            </>
          );
        }}
      </NavLink>
    </Hoverable>
  );
};

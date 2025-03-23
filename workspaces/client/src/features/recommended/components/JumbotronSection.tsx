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

interface Props {
  module: ArrayValues<StandardSchemaV1.InferOutput<typeof schema.getRecommendedModulesResponse>>;
}

export const JumbotronSection = ({ module }: Props) => {
  const playerRef = useRef<PlayerWrapper>(null);

  const episode = module.items[0]?.episode;
  invariant(episode);

  return (
    <>

      <NavLink
        viewTransition
        className="j-link"
        to={`/episodes/${episode.id}`}
      >
        {({ isTransitioning }) => {
          return (
            <>
              <div className="j-div">
                <div className="j-div2">
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
                </div>
                <div className="j-div3">
                  <Ellipsis ellipsis reflowOnResize maxLine={3} text={episode.description} visibleLine={3} />
                </div>
              </div>

              <Flipped stagger flipId={isTransitioning ? `episode-${episode.id}` : 0}>
                <div className="j-div4">
                  <Player
                    loop
                    playerRef={playerRef}
                    playerType={PlayerType.ShakaPlayer}
                    playlistUrl={`/streams/episode/${episode.id}/playlist.m3u8`}
                    className="j-player"
                  />
                </div>
              </Flipped>
            </>
          );
        }}
      </NavLink>
    </>
  );
};

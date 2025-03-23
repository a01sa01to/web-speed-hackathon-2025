import { Suspense } from 'react';
import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { type Params, useParams } from 'react-router';
import invariant from 'tiny-invariant';

import type { createStore } from '@wsh-2025/client/src/app/createStore';
import { useAuthActions } from '@wsh-2025/client/src/features/auth/hooks/useAuthActions';
import { useAuthUser } from '@wsh-2025/client/src/features/auth/hooks/useAuthUser';
import { useEpisodeById } from '@wsh-2025/client/src/features/episode/hooks/useEpisodeById';
import { AspectRatio } from '@wsh-2025/client/src/features/layout/components/AspectRatio';
import { Player } from '@wsh-2025/client/src/features/player/components/Player';
import { PlayerType } from '@wsh-2025/client/src/features/player/constants/player_type';
import { RecommendedSection } from '@wsh-2025/client/src/features/recommended/components/RecommendedSection';
import { useRecommended } from '@wsh-2025/client/src/features/recommended/hooks/useRecommended';
import { SeriesEpisodeList } from '@wsh-2025/client/src/features/series/components/SeriesEpisodeList';
import { PlayerController } from '@wsh-2025/client/src/pages/episode/components/PlayerController';
import { usePlayerRef } from '@wsh-2025/client/src/pages/episode/hooks/usePlayerRef';
import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

export const prefetch = async (store: ReturnType<typeof createStore>, { episodeId }: Params) => {
  invariant(episodeId);
  const episode = await store.getState().features.episode.fetchEpisodeById({ episodeId });
  const modules = await store
    .getState()
    .features.recommended.fetchRecommendedModulesByReferenceId({ limit: 1, referenceId: episodeId });
  return { episode, modules };
};

export const EpisodePage = () => {
  const authActions = useAuthActions();
  const user = useAuthUser();

  const { episodeId } = useParams();
  invariant(episodeId);

  const episode = useEpisodeById({ episodeId });
  invariant(episode);

  const modules = useRecommended({ referenceId: episodeId });

  const playerRef = usePlayerRef();

  const isSignInRequired = episode.premium && user == null;

  return (
    <>
      <title>{`${episode.title} - ${episode.series.title} - AremaTV`}</title>
      <link href="/public/styles/pages/episode.css" rel="stylesheet" />

      <div className="n-div">
        <Flipped stagger flipId={`episode-${episode.id}`}>
          <div className="n-div2">
            {isSignInRequired ? (
              <div className='n-div3'>
                <img
                  alt=""
                  className="n-img"
                  decoding="sync"
                  loading="eager"
                  src={thumbUrl(episode.thumbnailUrl, "lg")}
                />

                <div className="n-div4">
                  <p className="n-p">
                    プレミアムエピソードの視聴にはログインが必要です
                  </p>
                  <button className="n-btn" type="button" onClick={authActions.openSignInDialog}>
                    ログイン
                  </button>
                </div>
              </div>
            ) : (
              <Suspense
                fallback={
                  <AspectRatio ratioHeight={9} ratioWidth={16}>
                    <div className="n-div5">
                      <img
                        alt=""
                        className="n-img2"
                        decoding="sync"
                        loading="eager"
                        src={thumbUrl(episode.thumbnailUrl, "lg")}
                      />
                      <div className="n-div6" />
                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg
                        className="n-svg"
                        height={48}
                        viewBox="0 0 24 24"
                        width={48}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path
                            d="M12 3c4.97 0 9 4.03 9 9"
                            strokeDasharray="16"
                            strokeDashoffset="16"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              dur="0.3s"
                              fill="freeze"
                              values="16;0"
                            />
                            <animateTransform
                              attributeName="transform"
                              dur="1.5s"
                              repeatCount="indefinite"
                              type="rotate"
                              values="0 12 12;360 12 12"
                            />
                          </path>
                          <path
                            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                            strokeDasharray="64"
                            strokeDashoffset="64"
                            strokeOpacity=".3"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              dur="1.2s"
                              fill="freeze"
                              values="64;0"
                            />
                          </path>
                        </g>
                      </svg>
                    </div>
                  </AspectRatio>
                }
              >
                <div className="n-div7">
                  <Player
                    className="n-player"
                    playerRef={playerRef}
                    playerType={PlayerType.HlsJS}
                    playlistUrl={`/streams/episode/${episode.id}/playlist.m3u8`}
                  />

                  <div className="n-div8">
                    <PlayerController episode={episode} />
                  </div>
                </div>
              </Suspense>
            )}
          </div>
        </Flipped>

        <div className="n-div9">
          <div className="n-div10">
            <Ellipsis ellipsis reflowOnResize maxLine={1} text={episode.series.title} visibleLine={1} />
          </div>
          <h1 className="n-h1">
            <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
          </h1>
          {episode.premium ? (
            <div className="n-div11">
              <span className="n-span">
                プレミアム
              </span>
            </div>
          ) : null}
          <div className="n-div12">
            <Ellipsis ellipsis reflowOnResize maxLine={3} text={episode.description} visibleLine={3} />
          </div>
        </div>

        {modules[0] != null ? (
          <div className="n-div13">
            <RecommendedSection module={modules[0]} />
          </div>
        ) : null}

        <div className="n-div13">
          <h2 className="n-h2">
            エピソード
          </h2>
          <SeriesEpisodeList episodes={episode.series.episodes} selectedEpisodeId={episode.id} />
        </div>
      </div>
    </>
  );
};

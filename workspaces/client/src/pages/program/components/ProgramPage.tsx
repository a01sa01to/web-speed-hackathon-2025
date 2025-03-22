import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';
import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { Link, type Params, useNavigate, useParams } from 'react-router';
import { useUpdate } from 'react-use';
import invariant from 'tiny-invariant';

import type { createStore } from '@wsh-2025/client/src/app/createStore';
import { Player } from '@wsh-2025/client/src/features/player/components/Player';
import { PlayerType } from '@wsh-2025/client/src/features/player/constants/player_type';
import { useProgramById } from '@wsh-2025/client/src/features/program/hooks/useProgramById';
import { RecommendedSection } from '@wsh-2025/client/src/features/recommended/components/RecommendedSection';
import { useRecommended } from '@wsh-2025/client/src/features/recommended/hooks/useRecommended';
import { SeriesEpisodeList } from '@wsh-2025/client/src/features/series/components/SeriesEpisodeList';
import { useTimetable } from '@wsh-2025/client/src/features/timetable/hooks/useTimetable';
import { PlayerController } from '@wsh-2025/client/src/pages/program/components/PlayerController';
import { usePlayerRef } from '@wsh-2025/client/src/pages/program/hooks/usePlayerRef';
import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

export const prefetch = async (store: ReturnType<typeof createStore>, { programId }: Params) => {
  invariant(programId);

  const now = DateTime.now();
  const since = now.startOf('day').toISO();
  const until = now.endOf('day').toISO();

  const program = await store.getState().features.program.fetchProgramById({ programId });
  const channels = store.getState().features.channel.fetchChannels();
  const timetable = await store.getState().features.timetable.fetchTimetable({ since, until });
  const modules = await store
    .getState()
    .features.recommended.fetchRecommendedModulesByReferenceId({ limit: 1, referenceId: programId });
  return { channels, modules, program, timetable };
};

export const ProgramPage = () => {
  const { programId } = useParams();
  invariant(programId);

  const program = useProgramById({ programId });
  invariant(program);

  const timetable = useTimetable();
  const nextProgram = timetable[program.channel.id]?.find((p) => {
    return DateTime.fromISO(program.endAt).equals(DateTime.fromISO(p.startAt));
  });

  const modules = useRecommended({ referenceId: programId });

  const playerRef = usePlayerRef();

  const forceUpdate = useUpdate();
  const navigate = useNavigate();
  const isArchivedRef = useRef(DateTime.fromISO(program.endAt) <= DateTime.now());
  const isBroadcastStarted = DateTime.fromISO(program.startAt) <= DateTime.now();
  useEffect(() => {
    if (isArchivedRef.current) {
      return;
    }

    // 放送前であれば、放送開始になるまで画面を更新し続ける
    if (!isBroadcastStarted) {
      let timeout = setTimeout(function tick() {
        forceUpdate();
        timeout = setTimeout(tick, 250);
      }, 250);
      return () => {
        clearTimeout(timeout);
      };
    }

    // 放送中に次の番組が始まったら、画面をそのままにしつつ、情報を次の番組にする
    let timeout = setTimeout(function tick() {
      if (DateTime.now() < DateTime.fromISO(program.endAt)) {
        timeout = setTimeout(tick, 250);
        return;
      }

      if (nextProgram?.id) {
        void navigate(`/programs/${nextProgram.id}`, {
          preventScrollReset: true,
          replace: true,
          state: { loading: 'none' },
        });
      } else {
        isArchivedRef.current = true;
        forceUpdate();
      }
    }, 250);
    return () => {
      clearTimeout(timeout);
    };
  }, [isBroadcastStarted, nextProgram?.id]);

  return (
    <>
      <title>{`${program.title} - ${program.episode.series.title} - AremaTV`}</title>

      <div style={{ padding: '48px 24px' }}>
        <Flipped stagger flipId={`program-${program.id}`}>
          <div
            style={{
              margin: 'auto',
              marginBottom: '16px',
              maxWidth: '1280px',
              outline: '1px solid #212121',
            }}
          >
            {isArchivedRef.current ? (
              <div style={{ height: '100%', position: 'relative', width: '100%' }}>
                <img
                  alt=""
                  decoding="sync"
                  loading="eager"
                  src={thumbUrl(program.thumbnailUrl, 'lg')}
                  style={{ aspectRatio: "16 / 9", height: 'auto', width: '100%' }}
                />

                <div
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#00000077',
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    left: 0,
                    padding: '24px',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                >
                  <p
                    style={{
                      color: '#ffffff',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '32px',
                    }}
                  >
                    この番組は放送が終了しました
                  </p>
                  <Link
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#1c43d1',
                      borderRadius: '4px',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'row',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      padding: '12px',
                      width: '160px',
                    }}
                    to={`/episodes/${program.episode.id}`}
                  >
                    見逃し視聴する
                  </Link>
                </div>
              </div>
            ) : isBroadcastStarted ? (
              <div style={{ height: '100%', position: 'relative', width: '100%' }}>
                <Player
                  playerRef={playerRef}
                  playerType={PlayerType.VideoJS}
                  playlistUrl={`/streams/channel/${program.channel.id}/playlist.m3u8`}
                  style={{ height: '100%', width: '100%' }}
                />
                <div style={{ bottom: 0, left: 0, position: 'absolute', right: 0 }}>
                  <PlayerController />
                </div>
              </div>
            ) : (
              <div style={{ height: '100%', position: 'relative', width: '100%' }}>
                <img
                  alt=""
                  decoding="sync"
                  loading="eager"
                  src={thumbUrl(program.thumbnailUrl, 'lg')}
                  style={{ height: 'auto', width: '100%' }}
                />

                <div
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#00000077',
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    left: 0,
                    padding: '24px',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                >
                  <p
                    style={{
                      color: '#ffffff',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '32px',
                    }}
                  >
                    この番組は {DateTime.fromISO(program.startAt).toFormat('L月d日 H:mm')} に放送予定です
                  </p>
                </div>
              </div>
            )}
          </div>
        </Flipped>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: '#ffffff', fontSize: '16px' }}>
            <Ellipsis ellipsis reflowOnResize maxLine={1} text={program.episode.series.title} visibleLine={1} />
          </div>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 'bold',
              marginTop: '8px',
            }}
          >
            <Ellipsis ellipsis reflowOnResize maxLine={2} text={program.title} visibleLine={2} />
          </h1>
          <div
            style={{
              color: '#999999',
              fontSize: '16px',
              marginTop: '8px',
            }}
          >
            {DateTime.fromISO(program.startAt).toFormat('L月d日 H:mm')}
            {' 〜 '}
            {DateTime.fromISO(program.endAt).toFormat('L月d日 H:mm')}
          </div>
          <div
            style={{
              color: '#999999',
              fontSize: '16px',
              marginTop: '16px',
            }}
          >
            <Ellipsis ellipsis reflowOnResize maxLine={3} text={program.description} visibleLine={3} />
          </div>
        </div>

        {modules[0] != null ? (
          <div style={{ marginTop: '24px' }}>
            <RecommendedSection module={modules[0]} />
          </div>
        ) : null}

        <div style={{ marginTop: '24px' }}>
          <h2
            style={{
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '12px',
            }}
          >
            関連するエピソード
          </h2>
          <SeriesEpisodeList episodes={program.episode.series.episodes} selectedEpisodeId={program.episode.id} />
        </div>
      </div>
    </>
  );
};

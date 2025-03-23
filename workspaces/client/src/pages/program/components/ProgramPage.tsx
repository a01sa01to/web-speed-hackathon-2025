import { useEffect, useState } from 'react';
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
import dayjs from "@wsh-2025/client/src/utils/ext-dayjs";
import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

export const prefetch = async (store: ReturnType<typeof createStore>, { programId }: Params) => {
  invariant(programId);

  const now = dayjs().tz();
  const until = now.endOf("day").toISOString();

  const program = await store.getState().features.program.fetchProgramById({ programId });
  const channels = store.getState().features.channel.fetchChannels();
  const timetable = await store.getState().features.timetable.fetchTimetable({ channelId: program.channelId, since: program.endAt, until });
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
    return dayjs(program.endAt).isSame(dayjs(p.startAt))
  });

  const modules = useRecommended({ referenceId: programId });

  const playerRef = usePlayerRef();

  const forceUpdate = useUpdate();
  const navigate = useNavigate();
  const [isArchived, setIsArchived] = useState(dayjs(program.endAt).isBefore(dayjs().tz()));
  const isBroadcastStarted = dayjs(program.startAt).isBefore(dayjs().tz());

  useEffect(() => {
    if (dayjs(program.endAt).isBefore(dayjs().tz())) return;

    // 放送前であれば、放送開始になるまで待機
    if (!isBroadcastStarted) {
      const interval = setInterval(() => {
        if (dayjs().tz().isBefore(dayjs(program.startAt))) return;
        clearInterval(interval);
        forceUpdate();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }

    // 放送中に次の番組が始まったら、画面をそのままにしつつ、情報を次の番組にする
    const interval = setInterval(() => {
      if (dayjs().tz().isBefore(dayjs(program.endAt))) return;
      if (nextProgram?.id) {
        void navigate(`/programs/${nextProgram.id}`, {
          preventScrollReset: true,
          replace: true,
          state: { loading: 'none' },
        });
      } else {
        setIsArchived(true);
        forceUpdate();
      }
    }, 1000)
    return () => {
      clearInterval(interval);
    };
  }, [isBroadcastStarted, nextProgram?.id, program.endAt, program.startAt, forceUpdate, navigate]);

  return (
    <>
      <title>{`${program.title} - ${program.episode.series.title} - AremaTV`}</title>
      <link href="/public/styles/pages/program.css" rel="stylesheet" />

      <div className="q-root">
        <Flipped stagger flipId={`program-${program.id}`}>
          <div className="q-div">
            {isArchived ? (
              <div className="q-div2">
                <img
                  alt=""
                  className="q-img"
                  decoding="sync"
                  loading="eager"
                  src={thumbUrl(program.thumbnailUrl, 'lg')}
                />

                <div className="q-div3">
                  <p className="q-p">
                    この番組は放送が終了しました
                  </p>
                  <Link className="q-a"
                    to={`/episodes/${program.episode.id}`}
                  >
                    見逃し視聴する
                  </Link>
                </div>
              </div>
            ) : isBroadcastStarted ? (
              <div className="q-div4">
                <Player
                  className="q-player"
                  playerRef={playerRef}
                  playerType={PlayerType.VideoJS}
                  playlistUrl={`/streams/channel/${program.channel.id}/playlist.m3u8`}
                />
                <div className="q-div5">
                  <PlayerController />
                </div>
              </div>
            ) : (
              <div className='q-div6'>
                <img
                  alt=""
                  className="q-img"
                  decoding="sync"
                  loading="eager"
                  src={thumbUrl(program.thumbnailUrl, 'lg')}
                />

                <div className="q-div3">
                  <p className="q-p">
                    この番組は {dayjs(program.startAt).tz().format('M月D日 H:mm')} に放送予定です
                  </p>
                </div>
              </div>
            )}
          </div>
        </Flipped>

        <div className="q-div7">
          <div className="q-div8">
            <Ellipsis ellipsis reflowOnResize maxLine={1} text={program.episode.series.title} visibleLine={1} />
          </div>
          <h1 className="q-h1">
            <Ellipsis ellipsis reflowOnResize maxLine={2} text={program.title} visibleLine={2} />
          </h1>
          <div className="q-div9">
            {dayjs(program.startAt).tz().format('M月D日 H:mm')}
            {' 〜 '}
            {dayjs(program.endAt).tz().format("M月D日 H:mm")}
          </div>
          <div className="q-div10">
            <Ellipsis ellipsis reflowOnResize maxLine={3} text={program.description} visibleLine={3} />
          </div>
        </div>

        {modules[0] != null ? (
          <div className="q-div11">
            <RecommendedSection module={modules[0]} />
          </div>
        ) : null}

        <div className="q-div11">
          <h2 className="q-h2">
            関連するエピソード
          </h2>
          <SeriesEpisodeList episodes={program.episode.series.episodes} selectedEpisodeId={program.episode.id} />
        </div>
      </div>
    </>
  );
};

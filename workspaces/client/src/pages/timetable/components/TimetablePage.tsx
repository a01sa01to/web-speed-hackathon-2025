import invariant from 'tiny-invariant';

import type { createStore } from '@wsh-2025/client/src/app/createStore';
import { useTimetable } from '@wsh-2025/client/src/features/timetable/hooks/useTimetable';
import { ChannelTitle } from '@wsh-2025/client/src/pages/timetable/components/ChannelTitle';
import { NewTimetableFeatureDialog } from '@wsh-2025/client/src/pages/timetable/components/NewTimetableFeatureDialog';
import { ProgramList } from '@wsh-2025/client/src/pages/timetable/components/ProgramList';
import { TimelineYAxis } from '@wsh-2025/client/src/pages/timetable/components/TimelineYAxis';
import { useShownNewFeatureDialog } from '@wsh-2025/client/src/pages/timetable/hooks/useShownNewFeatureDialog';
import dayjs from "@wsh-2025/client/src/utils/ext-dayjs";

export const prefetch = async (store: ReturnType<typeof createStore>) => {
  const now = dayjs().tz();
  const since = now.startOf('day').toISOString();
  const until = now.endOf('day').toISOString();

  const channels = store.getState().features.channel.fetchChannels();
  const programs = await store.getState().features.timetable.fetchTimetable({ since, until });
  return { channels, programs };
};

export const TimetablePage = () => {
  const record = useTimetable();
  const shownNewFeatureDialog = useShownNewFeatureDialog();

  const channelIds = Object.keys(record);
  const programLists = Object.values(record);

  return (
    <>
      <title>番組表 - AremaTV</title>
      <link href="https://wsh2025-a01sa01to.pages.dev/styles/pages/timetable.css" rel="stylesheet" />

      <div className="s-root">
        <div className="s-container">
          {channelIds.map((channelId) => (
            <div key={channelId} className="s-item">
              <ChannelTitle channelId={channelId} />
            </div>
          ))}
        </div>

        <div className="s-axiss">
          <TimelineYAxis />
        </div>
        <div className="s-div">
          {programLists.map((programList, index) => {
            const channelId = channelIds[index];
            invariant(channelId);
            return (
              <div key={channelIds[index]} className="s-item">
                <ProgramList channelId={channelId} programList={programList} />
              </div>
            );
          })}
        </div>
      </div>

      <NewTimetableFeatureDialog isOpen={shownNewFeatureDialog} />
    </>
  );
};

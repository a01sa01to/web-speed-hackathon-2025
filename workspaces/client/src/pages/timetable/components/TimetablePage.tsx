import { DateTime } from 'luxon';
import invariant from 'tiny-invariant';

import type { createStore } from '@wsh-2025/client/src/app/createStore';
import { useTimetable } from '@wsh-2025/client/src/features/timetable/hooks/useTimetable';
import { ChannelTitle } from '@wsh-2025/client/src/pages/timetable/components/ChannelTitle';
import { NewTimetableFeatureDialog } from '@wsh-2025/client/src/pages/timetable/components/NewTimetableFeatureDialog';
import { ProgramList } from '@wsh-2025/client/src/pages/timetable/components/ProgramList';
import { TimelineYAxis } from '@wsh-2025/client/src/pages/timetable/components/TimelineYAxis';
import { useShownNewFeatureDialog } from '@wsh-2025/client/src/pages/timetable/hooks/useShownNewFeatureDialog';

export const prefetch = async (store: ReturnType<typeof createStore>) => {
  const now = DateTime.now();
  const since = now.startOf('day').toISO();
  const until = now.endOf('day').toISO();

  const channels = await store.getState().features.channel.fetchChannels();
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

      <div
        style={{
          display: 'grid',
          gridTemplateAreas: `'channel channel' 'hours content'`,
          height: '100%',
          overflowX: 'auto',
          overflowY: 'auto',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: '#000000',
            display: 'flex',
            flexDirection: 'row',
            gridArea: 'channel',
            paddingLeft: '24px',
            position: 'sticky',
            top: 0,
            width: "fit-content",
            zIndex: 20,
          }}
        >
          {channelIds.map((channelId) => (
            <div key={channelId} style={{ flexGrow: 0, flexShrink: 0 }}>
              <ChannelTitle channelId={channelId} />
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: '#000000',
            bottom: 0,
            flexGrow: 0,
            flexShrink: 0,
            gridArea: 'hours',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <TimelineYAxis />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gridArea: 'content' }}>
          {programLists.map((programList, index) => {
            const channelId = channelIds[index];
            invariant(channelId);
            return (
              <div key={channelIds[index]} style={{ flexGrow: 0, flexShrink: 0 }}>
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

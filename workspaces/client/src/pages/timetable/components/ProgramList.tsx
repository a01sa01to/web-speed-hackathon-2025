import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';
import type { ReactElement } from 'react';
import type { ArrayValues } from 'type-fest';

import { HEIGHT_ONE_HOUR } from '@wsh-2025/client/src/features/timetable/constants/grid_size';
import { Gutter } from '@wsh-2025/client/src/pages/timetable/components/Gutter';
import { Program } from '@wsh-2025/client/src/pages/timetable/components/Program';
import dayjs from "@wsh-2025/client/src/utils/ext-dayjs";

interface Props {
  channelId: string;
  programList: ArrayValues<StandardSchemaV1.InferOutput<typeof schema.getTimetableResponse>>[];
}

export const ProgramList = ({ channelId, programList }: Props): ReactElement => {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {programList.map((program) => {
          const startAt = dayjs.tz(program.startAt);
          const endAt = dayjs.tz(program.endAt);
          const duration = endAt.diff(startAt, 'minutes');
          const height = HEIGHT_ONE_HOUR * (duration / 60);

          return (
            <div key={program.id} style={{ flexGrow: 0, flexShrink: 0 }}>
              <Program height={height} program={program} />
            </div>
          );
        })}
      </div>

      <div
        style={{
          bottom: 0,
          position: "absolute",
          right: "-4px",
          top: 0,
          width: "8px",
          zIndex: 10,
        }}
      >
        <Gutter channelId={channelId} />
      </div>
    </div>
  );
};

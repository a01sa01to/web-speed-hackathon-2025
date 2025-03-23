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
    <div className="s-title-container">
      <div className="s-proglist">
        {programList.map((program) => {
          const startAt = dayjs(program.startAt).tz();
          const endAt = dayjs(program.endAt).tz();
          const duration = endAt.diff(startAt, 'minutes');
          const height = HEIGHT_ONE_HOUR * (duration / 60);

          return (
            <div key={program.id} style={{ flexGrow: 0, flexShrink: 0 }}>
              <Program height={height} program={program} />
            </div>
          );
        })}
      </div>

      <div className="s-title-gutter-container">
        <Gutter channelId={channelId} />
      </div>
    </div>
  );
};

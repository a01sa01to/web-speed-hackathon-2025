import { lens } from '@dhmk/zustand-lens';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';
import { produce } from 'immer';
import type { ArrayValues } from 'type-fest';

import { timetableService } from '@wsh-2025/client/src/features/timetable/services/timetableService';

type ProgramId = string;

interface TimetableState {
  programs: Record<ProgramId, ArrayValues<StandardSchemaV1.InferOutput<typeof schema.getTimetableResponse>>>;
}

interface TimetableActions {
  fetchTimetable: (params: {
    channelId?: string;
    since: string;
    until: string;
  }) => Promise<StandardSchemaV1.InferOutput<typeof schema.getTimetableResponse>>;
}

export const createTimetableStoreSlice = () => {
  return lens<TimetableState & TimetableActions>((set) => ({
    fetchTimetable: async ({ channelId, since, until }) => {
      const programs = await timetableService.fetchTimetable(channelId ? { channelId, since, until } : { since, until });
      set((state) => {
        return produce(state, (draft) => {
          draft.programs = {};
          for (const program of programs) {
            draft.programs[program.id] = program;
          }
        });
      });
      return programs;
    },
    programs: {},
  }));
};

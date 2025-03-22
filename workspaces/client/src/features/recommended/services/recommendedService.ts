import { createFetch, createSchema } from '@better-fetch/fetch';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import * as schema from '@wsh-2025/schema/src/api/schema';

import { schedulePlugin } from '@wsh-2025/client/src/features/requests/schedulePlugin';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  plugins: [schedulePlugin],
  schema: createSchema({
    '/recommended/:referenceId': {
      output: schema.getRecommendedModulesResponse,
    },
  }),
  throw: true,
});

interface RecommendedService {
  fetchRecommendedModulesByReferenceId: (params: {
    limit?: number;
    referenceId: string;
  }) => Promise<StandardSchemaV1.InferOutput<typeof schema.getRecommendedModulesResponse>>;
}

export const recommendedService: RecommendedService = {
  async fetchRecommendedModulesByReferenceId({ limit, referenceId }) {
    if (referenceId === "entrance" || referenceId === "error") {
      return await fetch(`/public/api/recommendation/${referenceId}.json`).then((res) => res.json()) as Promise<StandardSchemaV1.InferOutput<typeof schema.getRecommendedModulesResponse>>
    }

    const data = await $fetch('/recommended/:referenceId', {
      params: { limit, referenceId },
    });
    return data;
  },
};

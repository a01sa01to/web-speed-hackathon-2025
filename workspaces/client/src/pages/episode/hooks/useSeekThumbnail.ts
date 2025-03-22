import { StandardSchemaV1 } from '@standard-schema/spec';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { use } from 'react';

interface Params {
  episode: StandardSchemaV1.InferOutput<typeof schema.getEpisodeByIdResponse>;
}

async function getSeekThumbnail({ episode }: Params) {
  // HLS のプレイリストを取得
  const playlistUrl = `/streams/episode/${episode.id}/playlist.m3u8`;
  const m3u8 = await fetch(playlistUrl).then((res) => res.text());
  // /streams/{hoge}/{fuga}.ts のような URL になっているので、 hoge 部分を取得
  const streamId = m3u8.match(/\/streams\/([^/]+)\//)?.[1];
  if (streamId == null) {
    throw new Error('Invalid stream URL.');
  }
  return `/streams/${streamId}/preview.jpg`;
}

const weakMap = new WeakMap<object, Promise<string>>();

export const useSeekThumbnail = ({ episode }: Params): string => {
  const promise = weakMap.get(episode) ?? getSeekThumbnail({ episode });
  weakMap.set(episode, promise);
  return use(promise);
};

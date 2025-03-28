import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';

interface ChannelService {
  fetchChannelById: (query: {
    channelId: string;
  }) => StandardSchemaV1.InferOutput<typeof schema.getChannelByIdResponse>;
  fetchChannels: () => StandardSchemaV1.InferOutput<typeof schema.getChannelsResponse>;
}

export const channelService: ChannelService = {
  fetchChannelById({ channelId }) {
    const res = this.fetchChannels().find((channel) => channel.id === channelId);
    if (res == null) {
      throw new Error('Channel is not found.');
    }
    return res;
  },
  fetchChannels() {
    const data = [{ "id": "432f8151-9cee-4736-9149-e6004f1b3827", "logoUrl": "/public/logos/variety.svg", "name": "バラエティ" }, { "id": "464c17bc-e51a-4b93-9597-bb67c98c6551", "logoUrl": "/public/logos/news.svg", "name": "ニュース" }, { "id": "5925694b-d050-45ea-b7c4-3a6e44373ec2", "logoUrl": "/public/logos/fightingsports.svg", "name": "格闘" }, { "id": "644ceca9-d4cc-4dd5-926a-e7d26f528536", "logoUrl": "/public/logos/shogi.svg", "name": "将棋" }, { "id": "72d0c211-67cf-48c5-8103-6111ea00d109", "logoUrl": "/public/logos/drama.svg", "name": "ドラマ" }, { "id": "815bf011-f294-4b0d-9f87-6fff8a74e48d", "logoUrl": "/public/logos/music.svg", "name": "音楽" }, { "id": "93120961-e256-4e78-8fe9-686c657719be", "logoUrl": "/public/logos/sumo.svg", "name": "大相撲" }, { "id": "a62a82f3-f6f5-4a5e-b3b6-3b65585314e4", "logoUrl": "/public/logos/anime.svg", "name": "アニメ" }, { "id": "e5af3245-e522-4f83-9365-0f23a98a125a", "logoUrl": "/public/logos/reality.svg", "name": "リアリティーショー" }, { "id": "e62c3d26-eeb8-4b2c-ae44-4d6b60b73668", "logoUrl": "/public/logos/documentary.svg", "name": "ドキュメンタリー" }, { "id": "f5b65653-44c3-4874-aa3f-64fcaadefc3c", "logoUrl": "/public/logos/mahjong.svg", "name": "麻雀" }, { "id": "fdc180b7-98c4-4161-81fb-5f0023dbbc41", "logoUrl": "/public/logos/soccer.svg", "name": "サッカー" }]
    return data;
  },
};

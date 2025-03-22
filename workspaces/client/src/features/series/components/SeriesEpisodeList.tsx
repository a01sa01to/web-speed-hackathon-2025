import { SeriesEpisodeItem } from '@wsh-2025/client/src/features/series/components/SeriesEposideItem';

interface Props {
  episodes: {
    description: string;
    id: string;
    order: number;
    premium: boolean;
    thumbnailUrl: string;
    title: string;
  }[];
  selectedEpisodeId: string | null;
}

export const SeriesEpisodeList = ({ episodes, selectedEpisodeId }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px', width: '100%' }}>
      {episodes.map((episode) => (
        <div key={episode.id} style={{ flexGrow: 0, flexShrink: 0 }}>
          <SeriesEpisodeItem episode={episode} selected={episode.id === selectedEpisodeId} />
        </div>
      ))}
    </div>
  );
};

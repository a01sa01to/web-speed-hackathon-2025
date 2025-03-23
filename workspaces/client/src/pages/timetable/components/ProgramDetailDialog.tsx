import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';
import type { ReactElement } from 'react';
import { Link } from 'react-router';
import type { ArrayValues } from 'type-fest';

import { Dialog } from '@wsh-2025/client/src/features/dialog/components/Dialog';
import { useSelectedProgramId } from '@wsh-2025/client/src/pages/timetable/hooks/useSelectedProgramId';
import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

interface Props {
  isOpen: boolean;
  program: ArrayValues<StandardSchemaV1.InferOutput<typeof schema.getTimetableResponse>>;
}

export const ProgramDetailDialog = ({ isOpen, program }: Props): ReactElement => {
  const episode = program.episode;
  const [, setProgram] = useSelectedProgramId();

  const onClose = () => {
    setProgram(null);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div style={{ height: '75vh', overflow: 'auto', width: '100%' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>番組詳細</h2>

        <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{program.title}</p>
        <div style={{ color: '#999999', fontSize: '14px', marginBottom: '16px' }}>
          <div style={{ display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 5 }}>{program.description}</div>
        </div>
        <img
          alt=""
          decoding="async"
          loading="lazy" src={thumbUrl(program.thumbnailUrl, "md")} style={{
            border: '2px solid #ffffff1f',
            borderRadius: '8px',
            marginBottom: '24px',
            width: '100%',
          }}
        />

        {episode != null ? (
          <>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>番組で放送するエピソード</h3>

            <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{episode.title}</p>
            <div style={{ color: '#999999', fontSize: '14px', marginBottom: '16px' }}>
              <div style={{ display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 5 }}>{episode.description}</div>
            </div>
            <img
              alt=""
              decoding="async"
              loading="lazy" src={thumbUrl(episode.thumbnailUrl, "md")} style={{
                border: '2px solid #ffffff1f',
                borderRadius: '8px',
                marginBottom: '24px',
                width: '100%',
              }}
            />
          </>
        ) : null}

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Link
            style={{
              alignItems: 'center',
              backgroundColor: '#1c43d1',
              borderRadius: '4px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'row',
              fontSize: '14px',
              fontWeight: 'bold',
              justifyContent: 'center',
              padding: '12px',
              width: '160px',
            }}
            to={`/programs/${program.id}`}
            onClick={onClose}
          >
            番組をみる
          </Link>
        </div>
      </div>
    </Dialog>
  );
};

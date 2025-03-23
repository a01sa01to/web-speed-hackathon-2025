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
      <div className="s-progdet-dialog">
        <h2 className="s-dialog-h2">番組詳細</h2>

        <p className="s-dialog-desc2">{program.title}</p>
        <div className="s-dialog-desc3">
          <div className="webkitbox">{program.description}</div>
        </div>
        <img
          alt=""
          decoding="async"
          loading="lazy" src={thumbUrl(program.thumbnailUrl, "md")}
          className="s-progdet-img"
        />

        {episode != null ? (
          <>
            <h3 className='s-dialog-h2'>番組で放送するエピソード</h3>

            <p className="s-hogea">{episode.title}</p>
            <div className="s-dialog-desc3">
              <div className="webkitbox">{episode.description}</div>
            </div>
            <img
              alt=""
              className="s-progdet-img"
              decoding="async"
              loading="lazy" src={thumbUrl(episode.thumbnailUrl, "md")}
            />
          </>
        ) : null}

        <div className="s-dialog-btnc">
          <Link
            className="s-dialog-btn"
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

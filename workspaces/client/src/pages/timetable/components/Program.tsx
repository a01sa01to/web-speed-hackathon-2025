import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';
import { type ReactElement, useEffect, useRef, useState } from 'react';
import Ellipsis from 'react-ellipsis-component';
import type { ArrayValues } from 'type-fest';

import { ProgramDetailDialog } from '@wsh-2025/client/src/pages/timetable/components/ProgramDetailDialog';
import { useColumnWidth } from '@wsh-2025/client/src/pages/timetable/hooks/useColumnWidth';
import { useCurrentUnixtimeMs } from '@wsh-2025/client/src/pages/timetable/hooks/useCurrentUnixtimeMs';
import { useSelectedProgramId } from '@wsh-2025/client/src/pages/timetable/hooks/useSelectedProgramId';
import dayjs from "@wsh-2025/client/src/utils/ext-dayjs";
import { thumbUrl } from '@wsh-2025/client/src/utils/thumb';

interface Props {
  height: number;
  program: ArrayValues<StandardSchemaV1.InferOutput<typeof schema.getTimetableResponse>>;
}

export const Program = ({ height, program }: Props): ReactElement => {
  const width = useColumnWidth(program.channelId);

  const [selectedProgramId, setProgram] = useSelectedProgramId();
  const shouldProgramDetailDialogOpen = program.id === selectedProgramId;
  const onClick = () => {
    setProgram(program);
  };

  const currentUnixtimeMs = useCurrentUnixtimeMs();
  const isBroadcasting = dayjs(currentUnixtimeMs).tz().isBetween(dayjs(program.startAt), dayjs(program.endAt));
  const isArchived = dayjs(program.endAt).tz().isBefore(dayjs().tz())

  const titleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [shouldImageBeVisible, setShouldImageBeVisible] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const imageHeight = imageRef.current?.clientHeight ?? 0;
      const titleHeight = titleRef.current?.clientHeight ?? 0;
      setShouldImageBeVisible(imageHeight <= height - titleHeight);
    }, 250);
    return () => {
      clearInterval(interval);
    };
  }, [height]);

  return (
    <>
      <button
        className={["s-link", isBroadcasting && "broadcasting", isArchived && "archived"].filter(Boolean).join(" ")}
        style={{ height, width }}
        type="button"
        onClick={onClick}
      >
        <div className='s-prog-div'>
          <div ref={titleRef} className="s-prog-div2">
            <span className="s-span">
              {dayjs(program.startAt).tz().format("mm")}
            </span>
            <div className="s-div3">
              <Ellipsis ellipsis reflowOnResize maxLine={3} text={program.title} visibleLine={3} />
            </div>
          </div>
          <div style={{ opacity: shouldImageBeVisible ? 1 : 0, width: '100%' }}>
            <img
              ref={imageRef}
              alt=""
              className="s-progimg"
              decoding="async"
              loading="lazy"
              src={thumbUrl(program.thumbnailUrl, "md")}
            />
          </div>
        </div>
      </button>
      <ProgramDetailDialog isOpen={shouldProgramDetailDialogOpen} program={program} />
    </>
  );
};

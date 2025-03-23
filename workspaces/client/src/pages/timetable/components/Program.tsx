import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';
import { type ReactElement, useEffect, useId, useRef, useState } from 'react';
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
  const linkId = useId().replaceAll(":", "_")

  const [selectedProgramId, setProgram] = useSelectedProgramId();
  const shouldProgramDetailDialogOpen = program.id === selectedProgramId;
  const onClick = () => {
    setProgram(program);
  };

  const currentUnixtimeMs = useCurrentUnixtimeMs();
  const isBroadcasting = dayjs.tz(currentUnixtimeMs).isBetween(dayjs(program.startAt), dayjs(program.endAt));
  const isArchived = dayjs.tz(program.endAt).isBefore(dayjs.tz())

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
      <style>{`
      .${linkId} {
        cursor: pointer;
        background-color: ${isBroadcasting ? '#FCF6E5' : '#212121'};
        border: 1px solid #000000;
        height: ${height}px;
        opacity: ${isArchived ? "0.5" : "1"};
        padding: 8px 12px;
        textAlign: left;
        width: ${width}px;
      }
      .${linkId}:hover {
        filter: ${isArchived ? "brightness(2)" : "brightness(1.25)"};
      }
    `}</style>
      <button
        className={linkId}
        type="button"
        onClick={onClick}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', width: "100%" }}>
          <div ref={titleRef} style={{ alignItems: 'start', display: 'flex', flexDirection: 'row', justifyContent: 'start', marginBottom: '8px' }}>
            <span
              style={{
                color: isBroadcasting ? '#767676' : '#999999',
                flexGrow: 0,
                flexShrink: 0,
                fontSize: '14px',
                fontWeight: 'bold',
                marginRight: '8px',
              }}
            >
              {dayjs.tz(program.startAt).format("mm")}
            </span>
            <div
              style={{
                color: isBroadcasting ? '#212121' : '#ffffff',
                flexGrow: 1,
                flexShrink: 1,
                fontSize: '14px',
                fontWeight: 'bold',
                overflow: 'hidden',
              }}
            >
              <Ellipsis ellipsis reflowOnResize maxLine={3} text={program.title} visibleLine={3} />
            </div>
          </div>
          <div style={{ opacity: shouldImageBeVisible ? 1 : 0, width: '100%' }}>
            <img
              ref={imageRef}
              alt=""
              decoding="async"
              loading="lazy"
              src={thumbUrl(program.thumbnailUrl, "md")}
              style={{
                aspectRatio: "16 / 9",
                border: '2px solid #FFFFFF1F',
                borderRadius: '8px',
                pointerEvents: 'none',
                width: '100%',
              }}
            />
          </div>
        </div>
      </button>
      <ProgramDetailDialog isOpen={shouldProgramDetailDialogOpen} program={program} />
    </>
  );
};

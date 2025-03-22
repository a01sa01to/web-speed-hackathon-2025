import * as Slider from '@radix-ui/react-slider';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import type * as schema from '@wsh-2025/schema/src/api/schema';
import { Duration } from 'luxon';
import { useId } from "react"
import invariant from 'tiny-invariant';

import { SeekThumbnail } from '@wsh-2025/client/src/pages/episode/components/SeekThumbnail';
import { useCurrentTime } from '@wsh-2025/client/src/pages/episode/hooks/useCurrentTime';
import { useDuration } from '@wsh-2025/client/src/pages/episode/hooks/useDuration';
import { useMuted } from '@wsh-2025/client/src/pages/episode/hooks/useMuted';
import { usePlaying } from '@wsh-2025/client/src/pages/episode/hooks/usePlaying';

interface Props {
  episode: StandardSchemaV1.InferOutput<typeof schema.getEpisodeByIdResponse>;
}

export const PlayerController = ({ episode }: Props) => {
  const duration = useDuration();
  const [currentTime, updateCurrentTime] = useCurrentTime();
  const [playing, togglePlaying] = usePlaying();
  const [muted, toggleMuted] = useMuted();
  const linkId = useId().replaceAll(":", "_")
  const groupId = useId().replaceAll(":", "_")

  return (
    <>
      <style>{`
        .${linkId} {
          cursor: pointer;
          background: transparent;
          display: block;
          border-radius: 4px;
        }
        .${linkId}:hover {
          background: #ffffff1f;
        }
        .${groupId}:hover .opa100 {
          opacity: 1 !important;
        }
        .${groupId}:hover .h4 {
          height: 4px !important;
        }
        .focusoutlinenone:focus {
          outline: none !important;
        }
    `}</style>
      <div style={{ height: "120px", position: "relative" }}>
        <div style={{ background: "linear-gradient(to top, #212121, transparent)", bottom: 0, left: 0, pointerEvents: "none", position: "absolute", right: 0, top: 0 }} />

        <div style={{ bottom: 0, left: 0, paddingLeft: "12px", paddingRight: "12px", position: "absolute", right: 0 }}>
          <div className={groupId} style={{ height: "100%", position: "relative", width: "100%" }}>
            <div className="opa100" style={{ height: "100%", opacity: 0, pointerEvents: "none", position: "relative", width: "100%" }}>
              <SeekThumbnail episode={episode} />
            </div>

            <Slider.Root
              className={groupId}
              max={duration}
              min={0}
              orientation="horizontal"
              style={{
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                height: "20px",
                position: "relative",
                touchAction: "none",
                userSelect: "none",
                width: "100%",
              }}
              value={[currentTime]}
              onValueChange={([t]) => {
                invariant(t);
                updateCurrentTime(t);
              }}
            >
              <Slider.Track className="h4" style={{ background: "#999999", borderRadius: "4px", flexGrow: 1, height: "2px", position: "relative" }}>
                <Slider.Range className="h4" style={{ background: "#1c43d1", borderRadius: "4px", height: "2px", position: "absolute" }} />
              </Slider.Track>
              <Slider.Thumb className="opa100 focusoutlinenone" style={{ background: "#1c43d1", borderRadius: "10px", display: "block", height: "20px", opacity: 0, width: "20px" }} />
            </Slider.Root>
          </div>

          <div style={{ alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <div style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
              <div style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
                <button
                  aria-label={playing ? '一時停止する' : '再生する'}
                  className={linkId}
                  type="button"
                  onClick={() => {
                    togglePlaying();
                  }}
                >
                  {
                    playing ?
                      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                      <svg height="1em"
                        style={{
                          color: "#ffffff",
                          display: "block",
                          flexGrow: 0,
                          flexShrink: 0,
                          height: "20px",
                          margin: "14px",
                          width: "20px"
                        }} viewBox="0 0 24 24" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5t1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5t1.413.588T10 7v10q0 .825-.587 1.413T8 19" fill="currentColor" />
                      </svg>
                      :
                      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                      <svg height="1em"
                        style={{
                          color: "#ffffff",
                          display: "block",
                          flexGrow: 0,
                          flexShrink: 0,
                          height: "20px",
                          margin: "14px",
                          width: "20px"
                        }} viewBox="0 0 24 24" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" fill="currentColor" />
                      </svg>
                  }
                </button>

                <span style={{ color: "#FFFFFF", display: "block", flexGrow: 0, flexShrink: 0, fontSize: "12px", fontWeight: "bold", marginLeft: "4px" }}>
                  {Duration.fromObject({ seconds: currentTime }).toFormat('mm:ss')}
                  {' / '}
                  {Duration.fromObject({ seconds: duration }).toFormat('mm:ss')}
                </span>
              </div>
            </div>

            <div style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
              <button
                aria-label={muted ? 'ミュート解除する' : 'ミュートする'}
                className={linkId}
                type="button"
                onClick={() => {
                  toggleMuted();
                }}
              >
                {
                  muted ?
                    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                    <svg height="1em"
                      style={{
                        color: "#ffffff",
                        display: "block",
                        flexGrow: 0,
                        flexShrink: 0,
                        height: "20px",
                        margin: "14px",
                        width: "20px"
                      }} viewBox="0 0 24 24" width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.775 19.575q-.275.175-.55.325t-.575.275q-.375.175-.762 0t-.538-.575q-.15-.375.038-.737t.562-.538q.1-.05.188-.1t.187-.1L12 14.8v2.775q0 .675-.612.938T10.3 18.3L7 15H4q-.425 0-.712-.288T3 14v-4q0-.425.288-.712T4 9h2.2L2.1 4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l17 17q.275.275.275.7t-.275.7t-.7.275t-.7-.275zm2.225-7.6q0-2.075-1.1-3.787t-2.95-2.563q-.375-.175-.55-.537t-.05-.738q.15-.4.538-.575t.787 0Q18.1 4.85 19.55 7.05T21 11.975q0 .825-.15 1.638t-.425 1.562q-.2.55-.612.688t-.763.012t-.562-.45t-.013-.75q.275-.65.4-1.312T19 11.975m-4.225-3.55Q15.6 8.95 16.05 10t.45 2v.25q0 .125-.025.25q-.05.325-.35.425t-.55-.15L14.3 11.5q-.15-.15-.225-.337T14 10.775V8.85q0-.3.263-.437t.512.012M9.75 6.95Q9.6 6.8 9.6 6.6t.15-.35l.55-.55q.475-.475 1.087-.213t.613.938V8q0 .35-.3.475t-.55-.125z" fill="currentColor" />
                    </svg>
                    :
                    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                    <svg height="1em"
                      style={{
                        color: "#ffffff",
                        display: "block",
                        flexGrow: 0,
                        flexShrink: 0,
                        height: "20px",
                        margin: "14px",
                        width: "20px"
                      }} viewBox="0 0 24 24" width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 11.975q0-2.075-1.1-3.787t-2.95-2.563q-.375-.175-.55-.537t-.05-.738q.15-.4.538-.575t.787 0Q18.1 4.85 19.55 7.063T21 11.974t-1.45 4.913t-3.875 3.287q-.4.175-.788 0t-.537-.575q-.125-.375.05-.737t.55-.538q1.85-.85 2.95-2.562t1.1-3.788M7 15H4q-.425 0-.712-.288T3 14v-4q0-.425.288-.712T4 9h3l3.3-3.3q.475-.475 1.088-.213t.612.938v11.15q0 .675-.612.938T10.3 18.3zm9.5-3q0 1.05-.475 1.988t-1.25 1.537q-.25.15-.513.013T14 15.1V8.85q0-.3.263-.437t.512.012q.775.625 1.25 1.575t.475 2" fill="currentColor" />
                    </svg>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

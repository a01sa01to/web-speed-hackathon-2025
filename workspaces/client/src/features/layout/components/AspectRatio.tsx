import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  ratioHeight: number;
  ratioWidth: number;
}

export const AspectRatio = ({ children, ratioHeight, ratioWidth }: Props) => {
  return (
    <div style={{ aspectRatio: `${ratioWidth}/${ratioHeight}`, position: "relative", width: "100%" }}>
      {children}
    </div>
  );
};

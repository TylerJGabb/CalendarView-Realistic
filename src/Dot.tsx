import React from "react";
import { palette } from "./palette";

/* https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox */
export type DotType = keyof typeof palette;
export type DotProps = {
  type: DotType;
};
export const Dot = ({ type }: DotProps) => {
  const fill = palette[type];
  return (
    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100%" height="100%" fill={fill} />
      {/* <circle cx="5" cy="5" r="4" fill={fill} /> */}
    </svg>
  );
};

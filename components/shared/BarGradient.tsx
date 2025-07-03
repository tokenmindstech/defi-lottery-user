"use client";

import { useId } from "react";
import { Rectangle } from "recharts";
import { BarRectangleItem } from "recharts/types/cartesian/Bar";

type StopGradient = {
  offset: string;
  stopColor: string;
};

interface BarGradientProps extends BarRectangleItem {
  stopColor1: StopGradient;
  stopColor2: StopGradient;
  stopColor3: StopGradient;
}

const BarGradient = (props: BarGradientProps) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  const clipPathId = `clipPath-${id}`;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="100%">
          <stop
            offset={props.stopColor1.offset}
            stopColor={props.stopColor1.stopColor}
          />
          <stop
            offset={props.stopColor2.offset}
            stopColor={props.stopColor2.stopColor}
          />
          <stop
            offset={props.stopColor3.offset}
            stopColor={props.stopColor3.stopColor}
          />
        </linearGradient>

        <clipPath id={clipPathId}>
          <Rectangle {...props} />
        </clipPath>
      </defs>

      <rect
        x={props.x}
        width={props.width}
        height={props.background?.height}
        fill={`url(#${gradientId})`}
        y={props.background?.y}
        clipPath={`url(#${clipPathId})`}
      />
    </>
  );
};

export default BarGradient;

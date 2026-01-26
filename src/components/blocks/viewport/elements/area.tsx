interface AreaProps {
  x: string;
  y: string;
  size?: string;
}

/**
 * A flat "Hazard" area on the floor.
 * 
 * @param x - The x position (CSS value).
 * @param y - The y position (CSS value).
 * @param size - The size (width and height) of the area (CSS value).
 */
export const Area = ({ x, y, size = "150px" }: AreaProps) => (
  <div
    className="
      absolute
      -translate-x-1/2
      -translate-y-1/2
      bg-amber-500/10
      border
      border-amber-500/40
      overflow-hidden
    "
    style={{ left: x, top: y, width: size, height: size }}
  >
    <div
      className="
        w-[200%]
        h-full
        bg-[linear-gradient(90deg,transparent_0%,rgba(245,158,11,0.2)_50%,transparent_100%)]
        animate-[shimmer_2s_infinite]
      "
    />
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        text-[8px]
        font-black
        text-amber-500/50
        tracking-tighter
      "
    >
      CAUTION CAUTION CAUTION
    </div>
  </div>
);

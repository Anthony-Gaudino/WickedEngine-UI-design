interface WallProps {
  x: string;
  y: string;
  width: string;
  height: string;
}

/**
 * A standing 3D wall to block players.
 *
 * @param x - The x position (CSS value).
 * @param y - The y position (CSS value).
 * @param width - The width of the wall (CSS value).
 * @param height - The height of the wall (CSS value).
 */
export const Wall = ({ x, y, width = "120px", height = "80px" }: WallProps) => (
  <div
    className="
      absolute
      bg-slate-700
      border-t-2
      border-x
      border-slate-500
      shadow-2xl
      origin-bottom
      transform-[rotateX(-90deg)_translateZ(1px)]
      z-10
    "
    style={{
      left: x,
      top: y,
      width,
      height,
    }}
  >
    {/* Hazard Stripes */}
    <div
      className="
        w-full 
        h-full 
        opacity-10 
        bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,red_5px,red_10px)]
      "
    />
  </div>
);

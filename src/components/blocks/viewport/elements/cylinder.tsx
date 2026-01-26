interface CylinderProps {
  x: string;
  y: string;
  radius?: string;
  height?: string;
}

/**
 * A 3D Cylinder / Pillar.
 * Created using rounded-full and 3D rotation.
 * 
 * @param x - The x position (CSS value).
 * @param y - The y position (CSS value).
 * @param radius - The radius (CSS value).
 * @param height - The height (CSS value).
 */
export const Cylinder = ({
  x,
  y,
  radius = "40px",
  height = "100px",
}: CylinderProps) => (
  <div
    className="
      absolute
      origin-bottom
      transform-[rotateX(-90deg)]
      transform-3d
    "
    style={{
      left: x,
      top: y,
      width: radius,
      height,
    }}
  >
    {/* Round Top Cap */}
    <div
      className="
        absolute 
        top-0 
        left-0 
        rounded-full 
        bg-indigo-400 
        border 
        border-indigo-300
        transform-[translateY(-50%)_rotateX(90deg)]
      "
      style={{
        width: radius,
        height: radius,
      }}
    />
    {/* Curved Body */}
    <div
      className="
        w-full
        h-full
        bg-linear-to-r
        from-indigo-600
        via-indigo-500
        to-indigo-700
        border-x
        border-indigo-400/30
      "
    />
  </div>
);

interface SpawnPointProps {
  x: string;
  y: string;
}

/**
 * A "Spawn Point" represented by concentric glowing rings.
 * 
 * @param x - The x position (CSS value).
 * @param y - The y position (CSS value).
 */
export const SpawnPoint = ({ x, y }: SpawnPointProps) => (
  <div
    className="
      absolute
      -translate-x-1/2
      -translate-y-1/2
      flex
      items-center
      justify-center
    "
    style={{ left: x, top: y }}
  >
    <div
      className="
        absolute
        w-20
        h-20
        rounded-full
        border-2
        border-emerald-500/50
        animate-ping
      "
    />
    <div
      className="
        w-12
        h-12
        rounded-full
        bg-emerald-500/20
        border
        border-emerald-400
        flex
        items-center
        justify-center
        shadow-[0_0_15px_rgba(52,211,153,0.5)]
      "
    >
      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
    </div>
  </div>
);

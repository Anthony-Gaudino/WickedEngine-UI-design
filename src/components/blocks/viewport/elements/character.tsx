interface CharacterProps {
  x: string;
  y: string;
}

/**
 * A 3D glowing head stickman character
 * 
 * @param x - The x position (CSS value).
 * @param y - The y position (CSS value).
 */
export const Character = ({ x, y }: CharacterProps) => (
  <div
    className="
      absolute
      group
      origin-bottom
      transform-style-preserve-3d
      transform-[rotateX(-90deg)]
    "
    style={{
      left: x,
      top: y,
    }}
  >
    {/* Head */}
    <div
      className="
        absolute
        left-1/2
        -translate-x-1/2
        -top-27.5 w-6 h-6
        bg-white rounded-full
        border-2
        border-slate-400
        shadow-[0_0_10px_white]
      "
    />

    {/* Torso (The Spine) */}
    <div
      className="
        absolute
        left-1/2
        -translate-x-1/2
        -top-21.25
        w-1.5
        h-14
        bg-amber-600 rounded-full
      "
    />

    {/* Arms Container */}
    <div
      className="
        transform-3d
        absolute
        left-1/2
        -translate-x-1/2
        -top-18.75
        w-12
        h-0.5
      "
    >
      {/* Left Arm */}
      <div
        className="
          absolute
          right-1/2
          w-8
          h-1
          bg-amber-600
          origin-right
          -rotate-30
        "
      />
      {/* Right Arm */}
      <div
        className="
          absolute
          left-1/2
          w-8
          h-1
          bg-amber-600
          origin-left
          rotate-30
        "
      />
    </div>

    {/* Legs Container */}
    <div
      className="
        transform-3d
        absolute
        left-1/2
        -translate-x-1/2
        -top-7.5
        w-1
        h-1
      "
    >
      {/* Left Leg */}
      <div
        className="
          absolute
          top-0
          right-1
          w-10
          h-1.5
          bg-amber-600
          origin-right
          -rotate-65
        "
      />
      {/* Right Leg */}
      <div
        className="
          absolute
          top-0
          left-1
          w-10
          h-1.5
          bg-amber-600
          origin-left
          rotate-65
        "
      />
    </div>

    {/* Character Shadow (on the floor) */}
    <div
      className="
        absolute
        w-8
        h-4
        bg-black/40
        rounded-[100%]
        blur-sm
        top-0
        -left-3
        transform-[rotateX(90deg)_translateY(-20px)]
      "
    />
  </div>
);

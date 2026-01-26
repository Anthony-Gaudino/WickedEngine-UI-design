interface ViewportProps {
  children?: React.ReactNode;
}

/**
 * Viewport component representing the 3D view area for a new empty scene,
 * children components can represent some element in the scene.
 * 
 * @param children - The 3D elements to render inside the viewport.
 */
export const Viewport = ({children}: ViewportProps) => {
  return (
    <div
      className="
        relative
        w-full
        h-full
        bg-[#2a303c]
        overflow-hidden
        flex
        items-center
        justify-center
      "
    >
      {/* 1. Perspective Wrapper */}
      <div className="absolute inset-0 w-full h-full perspective-[1000px]">
        {/* 2. The Grid Plane */}
        <div
          className="
            absolute
            inset-0
            w-[200%]
            h-[200%]
            -left-[50%]
            top-[-50%]
            transform-[rotateX(75deg)]
            transform-3d
            bg-size-[40px_40px]
            bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] 
          "
        >
          {/* 3. Center Axis Lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-red-500/30" />
          <div className="absolute left-1/2 top-0 w-px h-full bg-blue-500/40" />

          {/* 4. Children go here! */}
          {children}
        </div>
      </div>
    </div>
  );
};

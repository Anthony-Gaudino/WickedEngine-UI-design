import { Area, Cylinder, SpawnPoint, Wall } from "./elements";
import { Viewport } from "./viewport";

/**
 * Renders a Level with various 3D elements inside a Viewport.
 */
export const Level = () => {
  return (
    <Viewport>
      {/* This container aligns the children to the 3D grid plane */}
      <SpawnPoint x="50%" y="60%" />

      <Wall x="47%" y="40%" width="200px" height="60px" />
      <Wall x="58%" y="30%" width="100px" height="120px" />

      <Cylinder x="45%" y="45%" radius="30px" height="150px" />

      <Area x="50%" y="50%" size="200px" />
    </Viewport>
  );
};

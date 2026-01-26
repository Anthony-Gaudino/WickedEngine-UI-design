import { Character } from "./elements";
import { Viewport } from "./viewport";

/**
 * Renders a simple Viewport with a Character in it.
 */
export const CharacterModel = () => {
  return (
    <Viewport>
      <Character x="50%" y="70%" />
    </Viewport>
  );
};

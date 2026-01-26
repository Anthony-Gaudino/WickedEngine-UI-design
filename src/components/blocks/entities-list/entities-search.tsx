import { CircleXIcon, Funnel } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface EntitiesSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

/**
 * Renders the entities search input.
 *
 * @param value - The current search value.
 * @param onChange - Callback invoked when the search value changes.
 * @param onClear - Callback invoked to clear the search input.
 */
export function EntitiesSearch({
  value,
  onChange,
  onClear,
}: EntitiesSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup className="w-full">
      <InputGroupInput
        ref={inputRef}
        type="search"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <InputGroupAddon>
        <Funnel />
      </InputGroupAddon>
      {value && (
        <InputGroupAddon align="inline-end">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Clear search"
            onClick={() => {
              onClear();
              inputRef.current?.focus();
            }}
          >
            <CircleXIcon className="size-4" />
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/index";
import React from "react";

function CheckBoxWithText({
  text,
  id,
  checked,
  onCheckedChange,
}: {
  text: string;
  id: string;
  checked?: CheckedState | undefined;
  onCheckedChange?(checked: CheckedState): void;
}) {
  return (
    <div className="flex items-center space-x-2 py-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  );
}

export default CheckBoxWithText;

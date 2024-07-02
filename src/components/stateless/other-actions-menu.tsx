import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/index";
import { cn } from "../../libs/utils";
import { Ellipsis } from "lucide-react";

interface IAction {
  text: string;
  type: "default" | "destructive";
  onClick: () => void;
}

interface IProps {
  actionArr: IAction[];
}

function OtherActionMenu({ actionArr }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actionArr.map((action, i) => {
          return (
            <DropdownMenuItem
              onClick={action.onClick}
              className={cn(
                " hover:!bg-muted ",
                action.type === "destructive"
                  ? "text-destructive hover:text-destructive-foreground hover:!bg-destructive"
                  : ""
              )}
            >
              {action.text}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OtherActionMenu;

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/index";
import { Ellipsis } from "lucide-react";

function OfferTableActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="bg-destructive text-destructive-foreground hover:!text-destructive-foreground hover:!bg-destructive">
          Reject Offer
        </DropdownMenuItem>
        <DropdownMenuItem>Report Offer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OfferTableActions;

import { Button, Separator } from "../ui/index";
import React from "react";
import AvatarWithName from "./avatar-with-name";
import Ratings from "./ratings";
import { Phone, User } from "lucide-react";

function Owner_Details_Box({
  profilePicture,
  fullname,
}: {
  profilePicture?: string;
  fullname?: string;
}) {
  return (
    <div className="p-4 gap-y-4 flex flex-col border rounded-lg h-auto">
      <h5 className="text-xl">Owner Details</h5>
      <Separator />
      <AvatarWithName profilePicture={profilePicture} fullname={fullname} />
      <Ratings value={4} />
      <Separator />
      <div className="grid grid-cols-[2fr_1fr] gap-x-4">
        <Button className="gap-2 font-semibold">
          <Phone />
          Contact Seller
        </Button>
        <Button variant={"outline"} className="gap-2">
          <User />
          Show Profile
        </Button>
      </div>
    </div>
  );
}

export default Owner_Details_Box;

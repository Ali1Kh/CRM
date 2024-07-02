import { Button } from "../ui/index";
import config from "/src/services/config";
import { Link } from "react-router-dom";
import React from "react";

function Property_Popup({
  price,
  id,
  image,
  title,
  advertNo,
}: {
  price: string;
  id: string;
  image: string;
  title: string;
  advertNo?: string | number;
}) {
  return (
    <div className="flex flex-col gap-y-0.5">
      <div className="w-full h-[100px] min-w-[140px] relative rounded-sm overflow-hidden">
        <img
          src={config.storage_url + "/advert/" + image}
          alt={"house"}
          className="object-cover"
          sizes="20vw"
        />
      </div>
      <p className="text-base text-primary">{price}</p>
      <p className="text-sm text-muted-foreground text-ellipsis">{title}</p>
      <Link to={"/dashboard/posts/" + advertNo}>
        <Button className="w-full" variant={"outline"}>
          Show
        </Button>
      </Link>
    </div>
  );
}

export default Property_Popup;

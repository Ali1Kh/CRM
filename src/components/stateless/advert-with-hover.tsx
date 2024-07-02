import { Button } from "../ui/index";
import { Link } from "react-router-dom";
import React from "react";

function handleClick() {
  alert("working");
}

function AdvertWithHover({ id }: { id: string }) {
  return (
    <div className="max-w-[300px] relative group cursor-pointer ">
      <p className="text-base ">#{id}</p>
      <div className="w-full group-hover:flex hidden flex-col absolute p-4 bg-white shadow-md rounded-sm z-10">
        <div className="w-full relative h-[150px] rounded-sm overflow-hidden">
          <img alt="background" src={"/assets/background.jpeg"} />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg pt-2">$40000</p>
          <p className="text-sm py-2 text-muted-foreground">july 2, 2023</p>
        </div>

        <p className="text-base py-2 text-muted-foreground">
          Pyramid of giza, Egypt
        </p>
        <Button>
          <Link to={"/dashboard/adverts"}>Open Advert</Link>
        </Button>
      </div>
    </div>
  );
}

export default AdvertWithHover;

import React from "react";
import AvatarWithName from "./avatar-with-name";
import Ratings from "./ratings";

function Testimonials() {
  return (
    <figure className="p-6 flex flex-col gap-y-6 border ">
      <AvatarWithName />
      <Ratings value={4.5} />
      <figcaption className="text-muted-foreground">
        Welcome to your future home, where every detail is crafted with your
        comfort and lifestyle in mind. Our exquisite real estate offerings
        epitomize elegance, luxury, and functionality.
      </figcaption>
      <p className="text-muted-foreground text-base">20 July, 2023</p>
    </figure>
  );
}

export default Testimonials;

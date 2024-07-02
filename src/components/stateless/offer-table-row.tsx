import { Button, TableCell, TableRow } from "../ui/index";
import React, { lazy } from "react";
import AvatarWithName from "./avatar-with-name";
import AdvertWithHover from "./advert-with-hover";
const OfferTableActions = lazy(() => import("./offer-table-actions"));

export interface IOfferTableRow {
  advertNo: string;
  offer: number | string;
  publishedAt: Date;
  user: any;
}

function OfferTableRow({ advertNo, offer, publishedAt, user }: IOfferTableRow) {
  return (
    <TableRow className="z-10">
      <TableCell className="font-medium">
        <AvatarWithName />
      </TableCell>
      <TableCell>
        <AdvertWithHover id={advertNo} />
      </TableCell>
      <TableCell>{publishedAt.toLocaleDateString()}</TableCell>
      <TableCell className="text-green-700 text-base">{offer}</TableCell>
      <TableCell className="text-right">
        <Button>Contact Seller</Button>
      </TableCell>
      <TableCell className="text-right">
        <OfferTableActions />
      </TableCell>
    </TableRow>
  );
}

export default OfferTableRow;

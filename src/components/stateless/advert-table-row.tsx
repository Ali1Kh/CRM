import { Button, TableCell, TableRow } from "../ui/index";
import React, { lazy } from "react";
import AdvertWithHover from "./advert-with-hover";

const AdvertRowActions = lazy(() => import("./advert-row-actions"));

export interface IAdvert_Table_Row {
  advertNo: string;
  offers: any;
  publishedAt: Date;
  user: any;
  views?: number;
}

function Advert_Table_Row({
  advertNo,
  offers,
  publishedAt,
  views,
  user,
}: IAdvert_Table_Row) {
  return (
    <TableRow className="z-10">
      <TableCell>
        <AdvertWithHover id={advertNo} />
      </TableCell>
      <TableCell>{publishedAt.toLocaleDateString()}</TableCell>
      <TableCell className="text-green-700 text-base">{offers}</TableCell>
      <TableCell className="text-green-700 text-base">{views}</TableCell>
      <TableCell className="text-right">
        <Button>Open Advert</Button>
      </TableCell>
      <TableCell className="text-right">
        <AdvertRowActions />
      </TableCell>
    </TableRow>
  );
}

export default Advert_Table_Row;

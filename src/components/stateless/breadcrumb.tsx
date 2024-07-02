import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";

function Breadcrumbs_Custom() {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnameArr = pathname.split("/");
  pathnameArr.shift();
  pathnameArr.shift();

  return (
    <Breadcrumb className="pt-4">
      <BreadcrumbList>
        {pathnameArr.map((link, i) => (
          <React.Fragment key={i}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={link}>{link.toUpperCase()}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator key={`separator-${i}`} />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs_Custom;

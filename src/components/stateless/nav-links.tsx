import { cn } from "../../libs/utils";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export interface INavLink {
  href: string;
  icon: any;
  text: string;
  badge?: any;
}

function NavLink({ href, icon, text, badge }: INavLink) {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnameWithoutLang = pathname.replace(/^\/[a-z]{2}/, "");
  const isActive = pathnameWithoutLang === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive ? "bg-muted !text-primary" : ""
      )}
    >
      {icon}
      {text}
      {badge}
    </Link>
  );
}

export default NavLink;

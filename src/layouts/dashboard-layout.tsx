import { dir } from "i18next";
import { Link } from "react-router-dom";
import {
  Bell,
  Heart,
  Home,
  LandPlot,
  Menu,
  MessageSquare,
  Package,
  Package2,
  Search,
  ShoppingCart,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

// import "./global.css";
import { Toaster } from "../components/ui/toaster";
import GenerateUi from "../libs/generate-ui";
import NavLink from "../components/stateless/navlinks";
import Profile_Menu from "../components/stateless/profile-menu";

const languages = ["en", "ar"];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function Dashboard({
  children,
}: //   children,
{
  children?: React.ReactNode;
}) {
  const offerBadge = (
    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
      6
    </Badge>
  );

  const arrOfLinks = [
    {
      text: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      href: "/dashboard",
    },
    {
      text: "Discover Posts",
      icon: <LandPlot className="h-4 w-4" />,
      href: "/dashboard/posts",
    },
    {
      text: "Offers",
      icon: <ShoppingCart className="h-4 w-4" />,
      href: "/dashboard/offers",
      badge: offerBadge,
    },
    {
      text: "Adverts",
      icon: <Package className="h-4 w-4" />,
      href: "/dashboard/adverts",
    },
    {
      text: "Saved Posts",
      icon: <Heart className="h-4 w-4" />,
      href: "saved-posts",
    },
  ];

  return (
    <html lang={"en"} dir={"en"}>
      <body>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2 md:sticky md:top-0">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link to="/" className="flex items-center gap-2 font-semibold">
                  <Package2 className="h-6 w-6" />
                  <span className="">CRM Egypt</span>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Messages</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  {GenerateUi({
                    RenderElement: NavLink,
                    dataArr: arrOfLinks,
                  })}
                </nav>
              </div>
              <div className="mt-auto p-4">
                <Card x-chunk="dashboard-02-chunk-0">
                  <CardHeader className="p-2 pt-0 md:p-4">
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Link to="/dashboard/posts/add">
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    {GenerateUi({
                      RenderElement: NavLink,
                      dataArr: arrOfLinks,
                    })}
                  </nav>
                  <div className="mt-auto">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>
                          Unlock all features and get unlimited access to our
                          support team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link to="discover/add">
                          <Button size="sm" className="w-full">
                            Upgrade
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="w-full flex-1">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    />
                  </div>
                </form>
              </div>
              <Profile_Menu />
            </header>
            {/* {post} */}
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

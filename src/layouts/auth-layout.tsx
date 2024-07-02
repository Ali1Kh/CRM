// import "../styles/global.css";
import { Toaster } from "../components/ui/toaster";
import React from "react";

const languages = ["en", "ar"];

export default function AuthLayout({
  children,
}: //   children,
{
  children?: React.ReactNode | any;
}) {
  return (
    <html lang={"en"} dir={"en"}>
      <body>
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-full xl:h-screen">
          <div className="flex items-center justify-center py-12">
            {children}
          </div>
          <div className="hidden bg-muted lg:block relative">
            <img
              src="/assets/background.jpeg"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale absolute"
            />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

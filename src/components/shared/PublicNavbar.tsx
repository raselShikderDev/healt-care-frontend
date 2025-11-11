import { Logo } from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { Loader2, LogOut, Menu } from "lucide-react";
import { Menu } from "lucide-react";
import { ComponentProps } from "react";
import LogoutButton from "./logoutButton";
import LogoutButtonMobile from "./logoutButtonMobile";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUserInfo } from "@/types/user.interface";
import { getDefaultDashboard } from "@/lib/authUtils";

const PublicNavbar = async (props: ComponentProps<typeof NavigationMenu>) => {
  const navItems = [
    { name: "Home", href: "/", role: "PUBLIC" },
    { name: "Consultation", href: "/consultations", role: "PUBLIC" },
    { name: "Health plans", href: "/healthplans", role: "PUBLIC" },
    { name: "Diagnostics", href: "/diagnostics", role: "PUBLIC" },
    { name: "NGOs", href: "/ngo", role: "PUBLIC" },
  ];

  const userInfo = (await getUserInfo()) as IUserInfo;
  const dashboardHome = getDefaultDashboard(userInfo?.role);

  if (userInfo && userInfo?.role) {
    navItems.push({
      name: "Dashboard",
      href: `/${dashboardHome.toLowerCase()}`,
      role: userInfo?.role,
    });
  }

  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop navigation */}
        <div className="hidden md:block">
          <NavigationMenu {...props}>
            <NavigationMenuList>
              {navItems.map((item, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop login button */}
          {userInfo?.role ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex cursor-pointer text-white bg-blue-500 rounded px-5 py-2 font-semibold hover:bg-blue-400 active:bg-transparent active:text-blue-500 active:border-blue-500 active:border active:font-semibold"
            >
              Log In
            </Link>
          )}

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="icon"
                >
                  <Menu />
                </Button>
              </SheetTrigger>

              <SheetContent className="flex flex-col h-full px-6 py-3">
                {/* Header inside sheet */}
                <div className="flex items-center justify-between">
                  <Logo />
                </div>

                {/* Navigation links */}
                <div className="flex-1 mt-6 flex flex-col space-y-4">
                  {navItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="text-lg font-medium hover:text-blue-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Footer inside sheet */}
                <SheetFooter className="mt-auto border-t pt-4">
                  {userInfo?.role ? (
                    <LogoutButtonMobile />
                  ) : (
                    <Link
                      href={"/login"}
                      className="w-full py-2 font-semibold text-center rounded-xl cursor-pointer bg-blue-500 text-white hover:bg-blue-400"
                    >
                      Log In
                    </Link>
                  )}
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;

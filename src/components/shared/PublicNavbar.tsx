import { Logo } from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ComponentProps } from "react";
import checkAuthStatus from "@/utility/auth";

const PublicNavbar = async (props: ComponentProps<typeof NavigationMenu>) => {
  const navItems = [
    { name: "Home", href: "/", role: "PUBLIC" },
    { name: "Consultation", href: "/consultations", role: "PUBLIC" },
    { name: "Health plans", href: "/healthplans", role: "PUBLIC" },
    { name: "Diagnostics", href: "/diagnostics", role: "PUBLIC" },
    { name: "NGOs", href: "/ngo", role: "PUBLIC" },
  ];

  try {
    // const data = await res.json();
    const data = await checkAuthStatus()
    console.log("in navbar data", data);
  } catch (error) {
    console.error(error);
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

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          {/* Desktop login button */}
          <Link
            href="/login"
            className="hidden md:inline-flex text-white bg-blue-500 rounded px-5 py-2 font-semibold hover:bg-blue-400 active:bg-transparent active:text-blue-500 active:border-blue-500 active:border active:font-semibold"
          >
            Log In
          </Link>

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
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>
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
                  <Link
                    href={"/login"}
                    className="w-full py-2 font-semibold text-center rounded-xl cursor-pointer bg-blue-500 text-white hover:bg-blue-400"
                  >
                    Log In
                  </Link>
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

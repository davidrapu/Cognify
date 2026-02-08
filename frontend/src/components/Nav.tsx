import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { Link, NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {Logo} from "./Logo";

const activePageStyle: string =
  "bg-primary text-primary-foreground text-lg px-3 py-1 rounded-[0.3em] m-0 font-semibold";
const inactivePageStyle: string =
  "text-md text-foreground transition-colors duration-150 ease-out hover:text-primary hover:underline underline-offset-4";

export default function Nav() {
  const { loggedIn } = useAuth();
  return (
    <NavigationMenu className=" max-h-fit  w-full [&>div]:w-full">
      <NavigationMenuList className="w-full justify-between mt-5 px-10">
        <div id="pages-and-logo" className="flex gap-x-5">
          <NavigationMenuItem className="">
              <Logo />
          </NavigationMenuItem>

          <div id="pages" className="flex gap-x-4 items-center">
            <NavigationMenuItem>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activePageStyle : inactivePageStyle
                }
              >
                Home
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activePageStyle : inactivePageStyle
                  }
                >
                  Dashboard
                </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavLink
                  to="/games"
                  className={({ isActive }) =>
                    isActive ? activePageStyle : inactivePageStyle
                  }
                >
                  Games
                </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? activePageStyle : inactivePageStyle
                  }
                >
                  About
                </NavLink>
            </NavigationMenuItem>
          </div>
        </div>
        <NavigationMenuItem className="flex items-center">
          {loggedIn ? 
          (
            <NavigationMenuTrigger className="flex items-center">
              <Avatar className="border-2 flex items-center justify-center">
                <AvatarImage src="USER_IMAGE" alt="USER_NAME" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
          ) : 
          (
              <Link
                to="/login"
                className="flex items-center text-foreground text-md "
              >
                Login
              </Link>
          )
          }
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

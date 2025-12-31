import React from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import logo from "../assets/icons8-brain-pastel-color-32.png";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const activePageStyle: string =
  "bg-primary text-primary-foreground text-[1.05em] px-3 py-1 rounded-[0.3em] m-0 transition-all duration-300 ease-in-out font-semibold";
const inactivePageStyle: string =
  "text-[1em] transition-all duration-300 ease-in-out hover:text-primary hover:text-[1.05em]";

export default function Nav() {
  const { loggedIn } = useAuth();
  return (
    <NavigationMenu className=" max-h-fit  w-full [&>div]:w-full">
      <NavigationMenuList className="w-full justify-between mt-5 px-10">
        <div id="pages-and-logo" className="flex gap-x-5">
          <NavigationMenuItem className="">
            <NavigationMenuLink>
              <Link to="/" className="flex flex-row items-center gap-x-1">
                <img src={logo} alt="Logo" />
                <span className="m-0 text-[1.8em] font-(family-name:--headings) tracking-[0.3em] ">
                  COGNIFY
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <div id="pages" className="flex gap-x-4 items-center">
            <NavigationMenuItem>
              <NavigationMenuLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activePageStyle : inactivePageStyle
                  }
                >
                  Home
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activePageStyle : inactivePageStyle
                  }
                >
                  Dashboard
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <NavLink
                  to="/games"
                  className={({ isActive }) =>
                    isActive ? activePageStyle : inactivePageStyle
                  }
                >
                  Games
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? activePageStyle : inactivePageStyle
                  }
                >
                  About
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </div>
        <NavigationMenuItem className="flex items-center">
          {loggedIn ? (
            <NavigationMenuTrigger className="flex items-center">
              <Avatar className="border-2 flex items-center justify-center">
                <AvatarImage src="USER_IMAGE" alt="USER_NAME" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
          ) : (
            <NavigationMenuLink>
              <Link to="/login" className="flex items-center">
                Login
              </Link>
              {/* Include signup and logged-in user state later */}
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

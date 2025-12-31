import React from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import logo from "../assets/icons8-brain-pastel-color-32.png";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { Link, NavLink } from "react-router-dom";

const activePageStyle: string =
  "bg-primary text-primary-foreground text-[1.1em] px-3 py-1 rounded-[0.3em] m-0 transition-all duration-300 ease-in-out font-semibold";
const inactivePageStyle: string =
  "text-[1em] transition-all duration-300 ease-in-out hover:text-primary hover:text-[1.1em]";

export default function Nav() {
  return (
    <NavigationMenu className=" max-h-fit px-6 w-full [&>div]:w-full">
      <NavigationMenuList className="w-full justify-between pt-5">
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

          <div id="pages" className="flex gap-x-5 items-center">
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
                  to="/games"
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
        <NavigationMenuItem className="flex items-center mr-3">
          <NavigationMenuLink>
            <Link to="/login">Login</Link> // Include signup and logged-in user state later
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

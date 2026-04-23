import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { Logo } from "./Logo";
import UserAvatar from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Gamepad2,
  Gauge,
  Home,
  // User,
  LogOut,
} from "./icons";
import { useIsMobile } from "@/hooks/use-mobile";
// import { useEffect } from "react";

const activePageStyle: string =
  "bg-primary text-primary-foreground text-md md:text-xl px-3 py-1 rounded-[0.3em] font-semibold";
const inactivePageStyle: string =
  "text-sm md:text-lg text-foreground transition-colors lg:duration-150 lg:ease-out lg:hover:text-primary lg:hover:underline underline-offset-4";

export default function Nav() {
  const isMobile = useIsMobile();
  const { loggedIn, logout } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  // useEffect(() => {
  //   console.log(isMobile);
  // })
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-between mt-2 px-2 md:px-4 lg:px-6">
      <NavigationMenu className=" flex items-center">
        <NavigationMenuList className="w-full justify-between">
          <div id="pages-and-logo" className="flex">
            <NavigationMenuItem className="">
              <Logo />
            </NavigationMenuItem>
            {!isMobile && (
              <div
                id="pages"
                className="flex items-center gap-x-2 md:gap-x-3 ml-4"
              >
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

                {/* <NavigationMenuItem>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? activePageStyle : inactivePageStyle
                  }
                >
                  About
                </NavLink>
              </NavigationMenuItem> */}
              </div>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      {loggedIn ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar size={isMobile ? 8 : 10} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" rounded-lg min-w-10 mr-1">
              {/* <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User />
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator /> */}
              {isMobile && (
                <>
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    <Home />
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <Gauge />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/games")}>
                    <Gamepad2 />
                    Games
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link
          to="/login"
          className="flex items-center text-foreground text-md "
        >
          Login
        </Link>
      )}
    </div>
  );
}

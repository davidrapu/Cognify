import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Link, NavLink } from "react-router";
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
  // User,
  LogOut } from "./icons";

const activePageStyle: string =
  "bg-primary text-primary-foreground text-lg px-3 py-1 rounded-[0.3em] m-0 font-semibold";
const inactivePageStyle: string =
  "text-md text-foreground transition-colors duration-150 ease-out hover:text-primary hover:underline underline-offset-4";

export default function Nav() {
  const { loggedIn, logout } = useAuth();
  const handleLogout = () => {
    logout()
    window.location.reload()
  }
  return (
    <div className=" flex items-center justify-between px-10 py-4">
      <NavigationMenu className=" flex items-center">
        <NavigationMenuList className="w-full justify-between">
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
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      {loggedIn ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger onClick={() => console.log('clicked')} >
              <UserAvatar size={9} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" rounded-lg min-w-26">
              {/* <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User />
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator /> */}
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

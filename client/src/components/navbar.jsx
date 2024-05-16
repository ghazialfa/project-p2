import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGenres } from "@/features/genres/genreSlice";

export function Navbar() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.genres);
  // console.log("🚀 ~ Navbar ~ genres:", list);

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <header className="flex items-center justify-between bg-gray-200 px-4 py-3 text-gray-900 md:px-6 dark:bg-gray-900 dark:text-white">
      <Link to={"/h"} className="flex items-center gap-2">
        <FilmIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Movie App</span>
      </Link>
      {/* <nav className="hidden items-center gap-4 md:flex">  
      </nav> */}

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-gray">
              Movies
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[400px]">
                <div className="mt-2">
                  <Link to={"/h"}>
                    <Button size="sm" className="w-full">
                      Latest
                    </Button>
                  </Link>
                </div>
                <div className="mt-2">
                  <Link to={"/popular"}>
                    <Button size="sm" className="w-full">
                      Popular
                    </Button>
                  </Link>
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-gray">
              Genres
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-3 lg:w-[400px]">
                {list &&
                  list.genres &&
                  list.genres.map(({ id, name }) => (
                    <div key={id} className="mt-2">
                      <Button size="sm" className="w-full">
                        {name}
                      </Button>
                    </div>
                  ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to={"/ai"}>Ai Recommendation</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            className="rounded-md bg-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-gray-600"
            placeholder="Search movies..."
            type="text"
          />
        </div>
        <Button className="rounded-full" size="icon" variant="outline">
          <UserIcon className="h-5 w-5" />
          <span className="sr-only">User Menu</span>
        </Button>
      </div>
    </header>
  );
}

function FilmIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

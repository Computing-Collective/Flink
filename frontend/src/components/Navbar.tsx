import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [username] = useState(localStorage.getItem("username"));
  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.href = "/login";
  }

  return (
    <Card className="min-w-full container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
      <div className="hidden md:flex min-w-full">
        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
          <li className="text-primary font-medium">
            <a href="/">
              <img src="favicon.ico" alt="icon" className="h-10 w-10" />
            </a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
        </ul>
        <div className="m-auto font-semibold">Welcome, {username}</div>
        <Button
          variant="secondary"
          className="hidden md:flex px-2"
          onClick={() => {
            handleLogout();
          }}>
          Logout
        </Button>
      </div>

      <div className="flex items-center w-full">
        <div className="flex md:hidden mr-2 items-center gap-2 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5 rotate-0 scale-100" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <a href="/">
                  <img src="favicon.ico" alt="icon" className="h-8 w-8" />
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/history">History</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex-grow" />
          <Button
            variant="secondary"
            className="flex md:hidden px-2"
            onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default Navbar;

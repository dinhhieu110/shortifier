import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut, UserIcon } from "lucide-react";
const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = true;
  return (
    <nav className="p-4 flex justify-between items-center">
      <Link
        to="/"
        className="font-extrabold text-[#0186da] text-shadow-md text-4xl"
      >
        Short URL
      </Link>
      <div>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-8 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LinkIcon className="h-4 w-4" />
                My URLs
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="cursor-pointer" onClick={() => navigate("/auth")}>
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;

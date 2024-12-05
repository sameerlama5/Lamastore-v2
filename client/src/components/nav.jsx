"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "./ui/dropdown-menu"; // Import DropdownMenu components from your library
import { useEffect, useState } from "react";

const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Nav = () => {
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUser || null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    router.push("/login");
  };

  const goToLoginPage = () => router.push("/login");

  return (
    <nav className="flex gap-[30px] items-center">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.path}
          className={`${
            link.path === pathname &&
            "text-[#00a0de] border-b-2 border-[#00a0de]"
          } capitalize font-medium hover:text-[#00a0de] transition-all`}
        >
          {link.name}
        </Link>
      ))}
      <div>
        {userData ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{userData.fullName || "User"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>{userData.fullName || "User"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={goToLoginPage}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const links = [
    {
        name: "home",
        path: "/",
    },
    {
        name: "Shop",
        path: "/shop",
    },
    {
        name: "About",
        path: "/about",
    },
    {
        name: "Contact",
        path: "/contact",
    },
];
const Nav = () => {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <nav className="flex gap-[30px] items-center">
            {links.map((link, index) => {
                return (
                    <Link
                     href={link.path}
                      key={index}
                       className={`${link.path === pathname && "text-[#00a0de] border-b-2 border-[#00a0de]"}
                    capitalize font-medium hover:text-[#00a0de] transition-all`}>
                        {link.name}
                    </Link>
                );
            })}
            <div className="flex gap-[30px]">
                <Button className="py-[10px] px-[22px] sm:px-[30px] font-semibold border-2 border-[#00a0de] bg-[#00a0de] hover:border-[#2e3192] hover:bg-[#2e3192] transition-all duration-500">
                    <Link href="/register">Register</Link>
                </Button>
                <Button className="py-[10px] px-[22px] sm:px-[30px] font-semibold bg-transparent text-[#00a0de] border-2 border-[#00a0de] hover:bg-[#00a0de] hover:text-[#fff] transition-all duration-500">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </nav>
    );
}

export default Nav;
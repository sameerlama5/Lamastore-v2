"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <nav className="flex gap-[30px]">
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
        </nav>
    );
}

export default Nav;
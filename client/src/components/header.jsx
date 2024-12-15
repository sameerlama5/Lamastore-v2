'use client'
import React from "react";
import Nav from "@/components/nav";
import MobileNav from "@/components/mobileNav";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-[20px] shadow-sm">
      <div className="container flex justify-between items-center">
            <Link href="/">
            <h1 className="h3 font-semibold text-[#2e3192]">
                Lama <span className="text-[#00a0de]">Store.</span>
            </h1>
            </Link>

            {/* desktop menu */}
            <div className="hidden md:block items-center">
            <Nav />
            </div>


            {/* mobile menu */}
            <div className="md:hidden">
                <MobileNav />
            </div>
        </div>
    </header>
  );
};

export default Header;

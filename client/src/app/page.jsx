"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header />
      <section>
        <section className="h-full py-[80px]">
          <div className="container">
            <div className="grid gap-[50px] grid-cols-1 items-center md:grid-cols-2">
              <div className="max-w-[630px]">
                <h1 className="text-[#000] font-bold mb-[10px]">
                  Mega Sale <span className="text-[#00a0de]">Special</span>{" "}
                  <br /> Offer up to <span className="text-[#2e3192]">60%</span>{" "}
                  Off
                </h1>
                <p className="mb-[40px] w-[100%] leading-relaxed">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et
                  amet facilis iste laboriosam corrupti neque ducimus quam quod
                  illum debitis, minima ipsam similique odit nemo consectetur
                  fugiat blanditiis in illo!
                </p>
                <div className="flex gap-[20px]">
                  <Button className="py-[10px] px-[22px] sm:px-[30px] font-semibold border-2 border-[#00a0de] bg-[#00a0de] hover:border-[#2e3192] hover:bg-[#2e3192] transition-all duration-500">
                    <Link href="./shop">Shop Now</Link>
                  </Button>
                  <Button className="py-[10px] px-[22px] sm:px-[30px] font-semibold bg-transparent text-[#00a0de] border-2 border-[#00a0de] hover:bg-[#00a0de] hover:text-[#fff] transition-all duration-500">
                    <Link href="#">Explore More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <figure className="banner-Img">
                  <Image
                    width={400}
                    height={400}
                    alt="NextUI hero Image"
                    className="cover"
                    src="/assets/image/banner lama store image.png"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

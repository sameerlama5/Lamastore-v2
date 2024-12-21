"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { CalendarCheck, HeartIcon, Joystick, LucideCombine, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [userData, setUserData] = useState(null);

  // Function to fetch product data
  const fetchProducts = async () => {
    const data = await fetch(`http://localhost:8000/product`);
    const res = await data.json();
    setProductList(res);
    console.log(res);
  };
  useEffect(() => {
    fetchProducts();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUser || null);
  }, []);

  const addToCart = async (userId, productId) => {
    const Data = { userId, productId };
    alert(JSON.stringify(Data))
  
    try {
      const productResponse = await axios.post('http://localhost:8000/cart', Data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (productResponse.status === 200 || productResponse.status === 201) {
        alert('Product added successfully!');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Request made but no response:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('Error adding product to cart');
    }
  };
  
  
  
  
  

  return (
    <main>
      <Header />
      <section className="h-full py-[80px]">
        <div className="container">
          <div className="grid gap-[50px] grid-cols-1 items-center md:grid-cols-2">
            <div className="max-w-[630px]">
              <h1 className="text-[#000] font-bold mb-[10px]">
                Mega Sale <span className="text-[#00a0de]">Special</span> <br />{" "}
                Offer up to <span className="text-[#2e3192]">60%</span> Off
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
      <section>
        <div className="container">
          <div className="gap-[30px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productList.map((item, index) => (
              <div
                className="group rounded-md transition-all duration-600 hover:shadow-lg shadow-md"
                key={index}
              >
                <div className="overflow-hidden p-0 relative h-auto">
                  <img
                    alt={item.title}
                    className="aspect-square object-cover object-center flex rounded-t-lg"
                    src={item.imageUrl}
                    unoptimized
                  />
                  <div className="flex justify-end w-[100%] absolute bottom-[-188px] group-hover:bottom-[0] transition-all duration-700 bg-white cursor-pointer">
                    <ul className="text-end w-[100%]">
                      <li className="flex items-center justify-end gap-3 py-2 px-3 border-b-[1px] border-b-gray-200 hover:bg-gray-100 hover:text-[#00a0de]">
                        Details
                        <CalendarCheck className="text-[#00a0de]" />
                      </li>
                      <li className="icon flex items-center justify-end gap-3 py-2 px-3 border-b-[1px] border-b-gray-200 hover:bg-gray-100 hover:text-[#00a0de]">
                        Compare
                        <LucideCombine className="text-[#00a0de]" />
                      </li>
                      <li className="flex items-center justify-end gap-3 py-2 px-3 border-b-[1px] border-b-gray-200 hover:bg-gray-100 hover:text-[#00a0de]"  onClick={() => addToCart(userData._id, item._id)}  >
                        Add to card
                        
                        <ShoppingCart className="text-[#00a0de]" />
                      </li>
                      <li className="flex items-center justify-end gap-3 py-2 px-3 border-b-[1px] border-b-gray-200 hover:bg-gray-100 hover:text-[#00a0de]">
                        Add to wishlist
                        <HeartIcon className="text-[#00a0de]" />
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-small block p-[30px]">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[16px]">{item.name}</h3>
                    <p className="text-default-500">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

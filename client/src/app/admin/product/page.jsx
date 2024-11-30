"use client";
import ProductForm from "@/components/add-product-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const fetchProducts = async () => {
    const data = await fetch(`http://localhost:8000/product`);
    const res = await data.json();
    setProductList(res);
    console.log(res);
  };
  useEffect(() => {
    fetchProducts();
  }, [productList]);
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex justify-end w-full">
          <Button className="flex items-center gap-2  py-[10px] px-[20px] rounded-md hover:bg-blue-700 text-white transition-all duration-500">
            <PlusIcon />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ProductForm />
        </DialogContent>
      </Dialog>
      <div className="grid gap-[30px] mt-[40px]">
        {productList.map((item) => (
          <div
            key={item._id}
            className="flex gap-[50px] items-center bg-gray-100 p-[30px] rounded-lg hover:[transform:translateY(-10px)] transition-all duration-700 group">
            <figure className="overflow-hidden rounded-lg">
              <Image
                height={150}
                width={150}
                src={item.imageUrl}
                alt={item.name}
                className="rounded-lg group-hover:scale-110 transform transition-all duration-700"
              />
            </figure>
            <div className="card-body flex justify-between w-[100%]">
              <h3 className="h5">{item.name}</h3>
              <div className="flex gap-[100px]">
                <span>{item.price}</span>
                <span>{item.category}</span>
              </div>
            </div>
            <button className="top-[10px] right-[20px] border-red-700 border-2 py-[10px] text-red-700 px-[10px] rounded-md hover:bg-red-700 hover:text-white transition-all duration-500">
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

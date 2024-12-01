"use client";
import ProductForm from "@/components/add-product-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon, TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [productList, setProductList] = useState([]);

  // Function to fetch product data
  const fetchProducts = async () => {
    const data = await fetch(`http://localhost:8000/product`);
    const res = await data.json();
    setProductList(res);
    console.log(res);
  };
  useEffect(() => {
    fetchProducts();
  }, []); 

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:8000/product/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex justify-end w-full">
          <div className="flex items-center gap-2 py-[10px] px-[20px] rounded-md hover:bg-blue-700 bg-blue-500 text-white transition-all duration-500">
            <PlusIcon />
            Add Product
          </div>
        </DialogTrigger>
        <DialogContent>
          <ProductForm />
        </DialogContent>
      </Dialog>

      <div className="grid gap-[30px] mt-[40px]">
        {productList.map((item) => (
          <div
            key={item._id}
            className="flex gap-[50px] items-center shadow-md p-[30px] rounded-lg hover:shadow-lg hover:[transform:translateY(-10px)] transition-all duration-700 group"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                height={150}
                width={150}
                src={item.imageUrl}
                alt={item.name}
                className="rounded-lg group-hover:scale-110 transform transition-all duration-700"
              />
            </div>
            <div className="card-body flex justify-between w-[100%]">
              <h3 className="h5 capitalize">{item.name}</h3>
              <div className="flex gap-[100px]">
                <span>{item.price}</span>
                <span>{item.category}</span>
              </div>
            </div>
            {console.log(item.imageUrl)}
            <button
              className="top-[10px] right-[20px] border-red-700 border-2 py-[10px] text-red-700 px-[10px] rounded-md hover:bg-red-700 hover:text-white transition-all duration-500"
              // Handling the product deletion
              onClick={() => handleDelete(item._id)}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
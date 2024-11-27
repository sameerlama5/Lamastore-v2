"use client"
import ProductForm from "@/components/add-product-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios.get(`http://localhost:8000/product`);
    setProductList(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center gap-2 border-blue-700  border-2 py-[10px] px-[20px] rounded-md hover:bg-blue-700 hover:text-white transition-all duration-500">
          <PlusIcon />
          Add Product
        </DialogTrigger>
        <DialogContent>
          <ProductForm />
        </DialogContent>
      </Dialog>
      {productList.map((item) => {
        return (
          <>
          <div key={item._id}>
            <Image 
            height={300}
            width={200}
            src={item.imageUrl}
            alt={item.name}
            />
            <div className="card-body">
              <h3 className="h5">{item.name}</h3>
              <p>{item.description}</p>
              <span>{item.price}</span>
              <span>{item.category}</span>
            </div>
          </div>
          </>
        )
      })}
    </div>

  );
};

export default Product;

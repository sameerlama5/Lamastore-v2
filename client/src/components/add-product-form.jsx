'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .positive('Price must be positive')
    .required('Price is required'),
  stock: Yup.number()
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  image: Yup.mixed().required('Image is required'),
  category: Yup.string().required('Category is required'),
});

export default function ProductForm() {
  const [formStatus, setFormStatus] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      image: null,
      category: '',
    },
    validationSchema: ProductSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setFormStatus('');
      try {
        const formData = new FormData();
        formData.append('image', values.image);

        // Upload image to the server
        const imageResponse = await fetch('http://localhost:8000/uploadproduct', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });

        const imageResult = await imageResponse.json();
        if (!imageResult.success) {
          throw new Error('Image upload failed.');
        }

        const productData = {
          ...values,
          image: imageResult.image_url, // Use uploaded image URL
        };

        // Submit product details
        const productResponse = await axios.post(
          'http://localhost:8000/product',
          productData
        );

        if (productResponse.status === 200 || productResponse.status === 201) {
          setFormStatus('Product added successfully!');
          resetForm();
          setPreviewImage(null);
        } else {
          throw new Error('Failed to add product.');
        }
      } catch (error) {
        setFormStatus(
          `Error: ${error.response?.data?.message || error.message}`
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('image', file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 max-w-[80%] md:max-w-[50%] mx-auto bg-gray-200 p-4 rounded-md"
    >
      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
        )}
      </div>

      {/* Price */}
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
        )}
      </div>

      {/* Stock */}
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.stock}
        />
        {formik.touched.stock && formik.errors.stock && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.stock}</div>
        )}
      </div>

      {/* Image */}
      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          onChange={handleImageChange}
          onBlur={formik.handleBlur}
        />
        {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-full h-auto" />}
        {formik.touched.image && formik.errors.image && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
        )}
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
          className="w-full border rounded p-2"
        >
          <option value="" label="Select category" />
          <option value="Men" label="Men" />
          <option value="Women" label="Women" />
          <option value="Kids" label="Kids" />
        </select>
        {formik.touched.category && formik.errors.category && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>

      {/* Form Status */}
      {formStatus && (
        <div className={`text-center text-sm mt-4 ${formStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {formStatus}
        </div>
      )}
    </form>
  );
}
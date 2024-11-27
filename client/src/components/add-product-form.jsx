'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import axios from 'axios'

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().positive('Price must be positive').required('Price is required'),
  stock: Yup.number().integer('Stock must be an integer').min(0, 'Stock cannot be negative').required('Stock is required'),
  imageUrl: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  category: Yup.string().required('Category is required'),
})

export default function ProductForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
      category: '',
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
        const {data} = await axios.post('http://localhost:8000/product', values)
      console.log(values)
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
   
      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
          ) : null}
        </div>

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
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
          ) : null}
        </div>

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
          {formik.touched.stock && formik.errors.stock ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.stock}</div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl}
          />
          {formik.touched.imageUrl && formik.errors.imageUrl ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.imageUrl}</div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
          ) : null}
        </div>

        <Button type="submit">Add Product</Button>
      </form>
  
  )
}


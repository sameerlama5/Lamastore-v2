'use client'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AlertCircle, Mail, Phone, Lock, UserCircle, Home, Calendar, User } from "lucide-react"
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\$$[0-9]{2,3}\$$[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  role: Yup.string().oneOf(['user', 'admin', 'vendor'], 'Invalid role').required('Required'),
  fullName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
})

export default function Register() {
  const { toast } = useToast()
  const [submitError, setSubmitError] = useState(null)

  return (
    (<div className="flex items-center justify-center min-h-screen bg-white p-4">
      <Card className="w-full max-w-[600px] bg-black/90 border-none">
        <CardHeader>
          <CardTitle className="text-4xl text-center text-white">Register Now</CardTitle>
          <CardDescription className="text-center">Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              email: '',
              phoneNumber: '',
              password: '',
              role: '',
              fullName: '',
              address: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={ async(values, { setSubmitting }) => {
              try {
              const {data} = await axios.post('http://localhost:8000/register', values)
              if(data) {
                toast(
                  {title: data.msg}
                )
              }
              } catch(error) {
                toast({
                  variant: "destructive",
                  title: error?.response?.data?.msg
                })
              }
              setSubmitError(null)
              setTimeout(() => {
                console.log(values)
                setSubmitting(false)
              }, 400)
            }}>
            {({ errors, touched, isSubmitting }) => (
              <Form className="grid grid-cols-2 gap-[30px] items-center text-white">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-[10px]">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Field name="email" as={Input} id="email" placeholder="Email" />
                  {errors.email && touched.email ? <div className="text-red-500 text-sm mt-1">{errors.email}</div> : null}
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2 mb-[10px]">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Field name="phoneNumber" as={Input} id="phoneNumber" placeholder="Phone Number" />
                  {errors.phoneNumber && touched.phoneNumber ? <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div> : null}
                </div>

                <div>
                  <Label htmlFor="password" className="flex items-center gap-2 mb-[10px]">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Field
                    name="password"
                    as={Input}
                    id="password"
                    type="password"
                    placeholder="Password" />
                  {errors.password && touched.password ? <div className="text-red-500 text-sm mt-1">{errors.password}</div> : null}
                </div>
      
                <div>
                  <Label htmlFor="role" className="flex items-center gap-2 mb-[10px]">
                    <UserCircle className="w-4 h-4" />
                    Role
                  </Label>
                  <Field name="role" as="select" id="role" className="border-[1px] px-[20px] py-[10px] w-[100%] rounded-md bg-transparent text-gray-400 text-[14px]">
                    <option value="">Select a role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="vendor">Vendor</option>
                  </Field>
                  {errors.role && touched.role ? <div className="text-red-500 text-sm mt-1">{errors.role}</div> : null}
                </div>
                <div>
                  <Label htmlFor="fullName" className="flex items-center gap-2 mb-[10px]">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Field name="fullName" as={Input} id="fullName" placeholder="Full Name" />
                  {errors.fullName && touched.fullName ? <div className="text-red-500 text-sm mt-1">{errors.fullName}</div> : null}
                </div>

                <div>
                  <Label htmlFor="address" className="flex items-center gap-2 mb-[10px]">
                    <Home className="w-4 h-4" />
                    Address
                  </Label>
                  <Field name="address" as={Input} id="address" placeholder="Address" />
                  {errors.address && touched.address ? <div className="text-red-500 text-sm mt-1">{errors.address}</div> : null}
                </div>

                {submitError && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center gap-2"
                    role="alert">
                    <AlertCircle className="w-4 h-4" />
                    <span className="block sm:inline">{submitError}</span>
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-700 transition-all duration-500">
                  {isSubmitting ? 'Submitting...' : 'Register'}
                </Button>

                <div>
                    <p className="text-sm text-white/80">Already have an account?<Link href="/login" className='text-blue-500 ms-2 hover:underline'>Login here!</Link></p>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>)
  );
}
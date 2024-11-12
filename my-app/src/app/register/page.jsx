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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\$$[0-9]{2,3}\$$[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Required'),
  fullName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
})

export default function Register() {
  const [submitError, setSubmitError] = useState(null)

  return (
    (<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-[1000px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
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
            onSubmit={(values, { setSubmitting }) => {
              setSubmitError(null)
              setTimeout(() => {
                console.log(values)
                setSubmitting(false)
              }, 400)
            }}>
            {({ errors, touched, isSubmitting }) => (
              <Form className="grid grid-cols-2 gap-[30px] items-center">
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
                  <Field name="role" as={Select} id="role">
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

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Submitting...' : 'Register'}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>)
  );
}
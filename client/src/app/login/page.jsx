'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, Lock } from 'lucide-react'
import Link from 'next/link'
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
})

export default function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const handleSubmit = async (values, {
    setSubmitting
  }) => {
   try{
    const {data} = await axios.post('http://localhost:8000/login', values)
    const {isLoggednIn, user} =data
    if(isLoggednIn) router.push(`/${user.role}/dashboard`)
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
    console.log(values)
    setTimeout(() => {
      setSubmitting(false)
    }, 400)
  }

  return (
    (<div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md bg-black/90 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center text-gray-400">Login your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}>
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`border-gray-600 text-white placeholder-gray-400 ${
                      errors.email && touched.email ? 'border-red-500' : ''
                    }`} />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`border-gray-600 text-white placeholder-gray-400 ${
                      errors.password && touched.password ? 'border-red-500' : ''
                    }`} />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 transition-all duration-500"
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-400">Don't have an account?</span>{' '}
            <Link href="/register" className="text-blue-400 hover:underline">
              Register here!
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}
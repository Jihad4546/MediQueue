"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Description,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function RegisterPage() {
const onSubmit = async(e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const user = Object.fromEntries(formData.entries());
  const {data , error} = await authClient.signUp.email({
    email : user.email ,
    password: user.password , 
    name: user.name, 
    image : user.photo

  })
  console.log(data , error)
  if(data){
    redirect('/')
  }
   if (error) {
    toast.error(error.message); 
  }

};

const handleGoogle =async()=>{
  const data = await authClient.signIn.social({
    provider:"google"
  })
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100 p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl" />

      {/* Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">
            Register to start your learning journey
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <TextField isRequired name="name">
            <Label className="text-gray-700">Name</Label>
            <Input placeholder="Your full name" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-gray-700">Email</Label>
            <Input placeholder="john@example.com" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Photo URL */}
          <TextField isRequired name="photo">
            <Label className="text-gray-700">Photo URL</Label>
            <Input placeholder="https://your-image-link.com" className="rounded-2xl" />
            <Description className="text-gray-500 text-sm">
              Paste a valid image URL for your profile picture
            </Description>
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-gray-700">Password</Label>
            <Input placeholder="Enter password" className="rounded-2xl" />
            <Description className="text-gray-500 text-sm">
              Min 8 chars, 1 uppercase, 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* Button */}
          <Button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
          >
            Register
          </Button>
        </Form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account? <Link href={'/login'}>
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">Login</span>
          </Link>
        </p>
        <div>
          <h1 className="text-center font-bold text-xl">or</h1>
          <Button onClick={handleGoogle} className={'w-full mt-4' } variant="outline"><FcGoogle />
 SingIn With Google</Button>
        </div>
      </div>
    </div>
  );
}

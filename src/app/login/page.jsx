"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {

  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());
    console.log(user)
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    })

    if (data) {
      router.push('/')
    }
    if (error) {
      toast.error(error.message);
    }

  };
  const handleGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google"
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100 p-4 overflow-hidden relative">
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">
            Login to continue your learning journey
          </p>
        </div>

        <Form onSubmit={onSubmit} className="flex flex-col gap-5">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="text-gray-700 mb-1">Email</Label>
            <Input
              placeholder="john@example.com"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="text-gray-700 mb-1">Password</Label>
            <Input
              placeholder="Enter your password"
              className="rounded-2xl"
            />
            <Description className="text-gray-500 text-sm">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>

            <button
              type="button"
              className="hover:text-indigo-600 transition"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex gap-3 mt-2">
            <Button
              type="submit"
              className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
            >
              <Check />
              Login
            </Button>
          </div>
        </Form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link href={'/singup'}>
            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </Link>
        </p>
        <div>
          <h1 className="text-center font-bold text-xl">or</h1>
          <Button onClick={handleGoogle} className={'w-full mt-4'} variant="outline"><FcGoogle />
            SingIn With Google</Button>
        </div>
      </div>
    </div>
  );
}

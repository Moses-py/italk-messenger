"use client";

import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     toast("Authenticated");
  //     setTimeout(() => {
  //       router.push("/users");
  //     }, 2000);
  //   }
  // }, [router, session?.status]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Make axios register request
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", {
            ...data,
            redirect: false,
          });
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "LOGIN") {
      // Make axios Login request
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in");
            router.push("/users");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAuth = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
        }
      })
      .finally(() => setIsLoading(false));

    // NextAuth social login
  };
  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border-gray-100 border bg-white px-4 py-10 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(submit)}>
            {variant === "REGISTER" && (
              <Input
                label="Name"
                register={register}
                id="name"
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              label="Email address"
              type="email"
              register={register}
              id="email"
              errors={errors}
              disabled={isLoading}
            />
            <Input
              label="Password"
              type="password"
              register={register}
              id="password"
              errors={errors}
              disabled={isLoading}
            />
            <div>
              <Button fullWidth type="submit" disabled={isLoading}>
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton icon={BsGithub} onClick={() => {}} />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAuth("google")}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to messenger?"
                : "Already have an account"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;

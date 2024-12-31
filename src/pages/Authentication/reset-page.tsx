/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetSchema } from "@/data/schemas/users-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { completePasswordResetComplete } from "@/service/apis/user-services";
import { useRecoilState } from "recoil";
import { IUser, userStore } from "@/store/user-store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VERIFICATION_EMAIL_MSG } from "@/utils/constants/constants";

const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);


  const location = useLocation();
  const from = location.state?.from;
  
  const [searchParams] = useSearchParams();
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      key: searchParams.get("key") || "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutKey: NodeJS.Timeout | undefined;

    if (errorMessage) {
      timeoutKey = setTimeout(() => {
        if (errorMessage === VERIFICATION_EMAIL_MSG) {
          navigate("/verify-email");
        }
        setErrorMessage(null);
      }, 3000);
    }

    if (userData) {
      if (userData.roles.includes("Supplier")){

        navigate(from || '/supplier-dashboard');
      }
      else{
        navigate(from || '/buyer-dashboard'); 

      } 
    }

    return () => clearTimeout(timeoutKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage, userData]);

  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    let timeoutKey: NodeJS.Timeout | undefined;
    try {
      setLoading(true);
      const id = searchParams.get("id") || "";

      const response: AxiosResponse<any, any> =
        await completePasswordResetComplete({ ...values, id });

      if (response.status === HttpStatusCode.Ok) {
        form.reset();
        const token: string = response.data.data.token;
        const userData: any = response.data.data.data;

        setUserData(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("profile", JSON.stringify(userData));
        setLoading(false);
        if (userData.roles.includes("Supplier")) {
          console.log(userData);
          navigate(from || `/supplier-dashboard`);
        } else navigate(from || `/buyer-dashboard`);
        setSuccessMessage(true);

        timeoutKey = setTimeout(() => {
          setSuccessMessage(false);
        }, 2000);

        return () => clearTimeout(timeoutKey);
      }
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-10/12 xl:w-8/12 mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8">
      <div className="py-20 px-8 border bg-white">
        <div className="flex px-8 flex-col items-center">
          <p className="text-4xl font-extrabold text-center">Reset Password</p>
          <div className="-mt-2">
            <svg
              className="w-80"
              width="354"
              height="30"
              viewBox="0 0 354 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                stroke="#FFBB38"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8 mt-16"
          >
            <div className="">
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Code *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="Reset code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus:outline-none w-full"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus:outline-none w-full"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {errorMessage && (
              <p className="text-base text-center font-light text-red-600">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-base text-center font-light text-green-600">
                success
              </p>
            )}
            <Button type="submit" className="w-full h-12">
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <span>Reset Password</span>
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="hidden lg:block w-full h-auto bg-white"></div>
    </main>
  );
};

export default ResetPassword;

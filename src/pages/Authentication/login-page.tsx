/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "@/data/schemas/users-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { userLogin } from "@/service/apis/user-services";
import { useRecoilState, useSetRecoilState } from "recoil";
import { EmailStore, IUser, userStore } from "@/store/user-store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoginDashboard from "./LoginDashboard";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const setEmailData = useSetRecoilState(EmailStore);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";
  const previousPath =
    new URLSearchParams(location.search).get("previous") || "/";

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => setErrorMessage(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);
  console.log({redirectPath, previousPath})
  useEffect(() => {
    if (userData) {
      const destination = userData.roles.includes("Supplier")
        ? "/supplier-dashboard"
        : "/buyer-dashboard";

      navigate(redirectPath || previousPath || destination);
      
    }
  }, [userData, navigate, redirectPath, previousPath]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const response: AxiosResponse<any, any> = await userLogin(values);
      if (response.status === HttpStatusCode.Ok) {
        form.reset();
        const { token, data: userData } = response.data.data;
        setUserData(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("profile", JSON.stringify(userData));
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 2000);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setEmailData({
          email: values.email,
          id: error.response?.data?.data?.id,
        });
        setErrorMessage(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const Message = ({
    type,
    text,
  }: {
    type: "error" | "success";
    text: string;
  }) => (
    <p
      className={`text-center ${
        type === "error" ? "text-red-600" : "text-green-600"
      }`}
    >
      {text}
    </p>
  );

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <LoginDashboard />

      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="w-full lg:w-1/2 bg-white p-6 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto px-4 sm:px-8 flex flex-col items-center">
            <p className="text-2xl font-bold text-center">Sign In</p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          {...field}
                          className="w-full sm:w-96 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                            className="w-full sm:w-96 focus:outline-none"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-4 w-4 text-gray-500" />
                            ) : (
                              <EyeOffIcon className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-main text-sm">
                    Forgot Password?
                  </Link>
                </div>

                {errorMessage && <Message type="error" text={errorMessage} />}
                {successMessage && <Message type="success" text="Success!" />}

                <Button type="submit" className="w-full">
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="text-center mt-4">
                  <Button
                    disabled
                    variant="outline"
                    className="w-full flex items-center justify-center"
                  >
                    <FcGoogle className="mr-2" /> Sign In with Google
                  </Button>
                  <p className="mt-4 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to={`/signup?redirect=${redirectPath}&previous=${previousPath}`}
                      className="underline text-gray-600"
                    >
                      Sign up free
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-gray-200 p-6 lg:p-12 flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-base lg:text-lg mb-6">
            If you don't have an account, please register to gain access to our
            services. Fill in your personal information, and we'll get you set
            up in no time.
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

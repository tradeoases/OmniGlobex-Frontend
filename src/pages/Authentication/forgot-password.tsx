import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/data/schemas/forgot-password-schema";
import { AxiosResponse, HttpStatusCode } from "axios";
import { startPasswordReset } from "@/service/apis/user-services";
import { useNavigate } from "react-router-dom";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: AxiosResponse<any, any> = await startPasswordReset(
        data.email
      );
      if (
        response.status === HttpStatusCode.Ok ||
        response.status === HttpStatusCode.Created
      ) {
        navigate(`/reset-password/?id=${response.data.data.id}`);
      }
    } catch (error) {
      console.error("Password reset failed", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-10/12 md:w-1/2 xl:w-1/3 mb-40 border bg-white rounded-md p-8 space-y-8">
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-white">
              Email Address *
            </label>
            <Input
              id="email"
              {...register("email")}
              className="bg-white text-black border border-gray-300 p-2 rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <Button type="submit" className="w-full text-white p-3 rounded-md">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

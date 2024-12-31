/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { AxiosResponse, HttpStatusCode } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { useNavigate } from "react-router-dom";
// import { addBusinessUser } from "@/service/apis/business-services";

// Define the schema for validation using Zod
export const addBusinessUserSchema = z.object({
  username: z.string().min(1, "User name is required"),
  useremail: z.string().min(1, "User email is required"),
});

type AddUserFom = z.infer<typeof addBusinessUserSchema>;

const AddBusinessUserPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage] = useState<boolean>(false);
  // const navigate = useNavigate();
  const form = useForm<AddUserFom>({
    resolver: zodResolver(addBusinessUserSchema),
    defaultValues: {
      username: "",
      useremail: "",
    },
  });

  const onSubmit = async (values: AddUserFom) => {
    try {
      setLoading(true);
      console.log("Form Values: ", values);

      // const response: AxiosResponse<any, any> = await addBusinessUser(values);

      // if (response.status === HttpStatusCode.Created) {
      //   form.reset();
      //   navigate("/profile");
      // }

      // console.log(response)

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMessage("Failed to create user");
    }
  };

  return (
    <div className="w-full max-w-full mx-auto mt-10">
      <div className="w-10/12 xl:w-8/12 mx-auto flex flex-col items-center px-7 py-10 bg-white">
        <p className="text-4xl font-bold text-center">Add Business User</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10 w-full"
          >
            <div className="w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="User Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="useremail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="focus:outline-none"
                        placeholder="User Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {errorMessage && (
              <p className="text-base text-center font-semibold text-red-600">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-base text-center font-semibold text-green-600">
                user added successfully!
              </p>
            )}
            <Button disabled={loading} type="submit" className="w-full h-12">
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <span>Add User</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBusinessUserPage;

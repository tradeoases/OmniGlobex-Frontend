import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/service/apis/user-services";

// Define schema with password validation
const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Old Password must be at least 8 characters long" }),
    currentPassword: z
      .string()
      .min(8, { message: "New Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.currentPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const ChangeBuyerPassword = () => {
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      currentPassword: "",
      confirmPassword: "",
    },
  });

  // Use mutation to change password
  const {
    mutate: updatePassword,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: changePassword,
    onSuccess: (data) => {
      // Handle successful password update
      console.log("Password updated successfully:", data);
      form.reset(); // Reset the form after successful update
    },
    onError: (error) => {
      // Handle error
      console.error("Error updating password:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof passwordResetSchema>) => {
    const { confirmPassword, ...rest } = data;
    updatePassword({ ...rest }); // Call the mutation with the data needed for password change
  };

  // State for toggling visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle functions
  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleCancel = () => {
    form.reset(); // Reset form fields when cancel is clicked
  };

  return (
    <div className="col-span-3 no-scrollbars bg-white p-4 md:p-8 relative w-full overflow-x-auto">
      <Form {...form}>
        <form
          className="w-full max-w-xl mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Old Password Field */}
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        className="focus-visible:outline-none focus:outline-none w-full pr-10"
                        placeholder="Old Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={toggleOldPasswordVisibility}
                      >
                        {showOldPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* New Password Field */}
          <div>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        className="focus:outline-none w-full pr-10"
                        placeholder="New Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={toggleNewPasswordVisibility}
                      >
                        {showNewPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Confirm New Password Field */}
          <div>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        className="focus:outline-none w-full pr-10"
                        placeholder="Confirm New Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-36">
              <Button
                type="submit"
                className="w-full h-10 rounded-full bg-main text-black hover:bg-main/80 shadow-none"
                disabled={isPending} // Disable button while loading
              >
                <span>{isPending ? "Updating..." : "Update Password"}</span>
              </Button>
            </div>
            <div className="w-full md:w-36 text-center">
              <span
                onClick={handleCancel}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                Cancel
              </span>
            </div>
          </div>

          {/* Error Message */}
          {isError && <p className="text-red-500">{error?.message}</p>}
          {isSuccess && (
            <p className="text-green-500">Password updated successfully!</p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ChangeBuyerPassword;

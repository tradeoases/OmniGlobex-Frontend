import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { personalInfoSchema } from "@/data/schemas/users-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { HiPencil } from "react-icons/hi2";
import { IUser } from "@/store/user-store";
import { getUserInfo } from "@/service/apis/user-services";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

interface Props {
  userData: IUser | null;
}

export const PersonalSection: React.FC<Props> = () => {
  const [isEditing, setIsEditing] = useState<"editing" | "viewing">("viewing");

  const {
    data: personalInfo,
    isLoading: personalInfoLoading,
    isSuccess: isSuccessPersonal,
    isError: personalInfoErrored,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getUserInfo();
      if (response.status === 200) {
        const finalUserData = response.data.data;
        return finalUserData;
      }
    },
  });

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      location: "",
      fullname: "",
      email: "",
      phoneNumber: "",
      city: "",
    },
  });

  useEffect(() => {
    if (isSuccessPersonal) {
      form.setValue("fullname", personalInfo.fullname);
      form.setValue("city", personalInfo.city);
      form.setValue("location", personalInfo.address);
      form.setValue("email", personalInfo.email);
      form.setValue("phoneNumber", personalInfo.phonenumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessPersonal, personalInfo, personalInfoLoading]);

  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {
    console.log(values);
  };
  return (
    <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4 space-y-10 lg:space-y-0 bg-white p-8">
      {isEditing === "editing" && (
        <div className="lg:col-span-2">
          {isSuccessPersonal && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
              >
                <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="fullname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="focus:outline-none"
                              placeholder="First Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isUpdate}
                            className="w-full focus:outline-none"
                            placeholder="Last Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                </div>

                <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="focus:outline-none"
                              placeholder="Email Address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full focus:outline-none"
                              placeholder="Phone Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* <div className="w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="countryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full focus:outline-none"
                          placeholder="Country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}

                <div className="w-full items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full focus:outline-none"
                            placeholder="Address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Town/City</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="focus:outline-none"
                              placeholder="Town/City"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="postCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Code</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isUpdate}
                            className="w-full focus:outline-none"
                            placeholder="Post Code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      form.reset();
                      setIsEditing("viewing");
                    }}
                    variant="link"
                    className="text-red-600"
                  >
                    cancel
                  </Button>
                  <Button
                    // onClick={}
                    className="rounded-none shadow-none"
                  >
                    Update profile
                  </Button>
                </div>
              </form>
            </Form>
          )}
          {personalInfoErrored && <div>Error while loading personal data</div>}
          {personalInfoLoading && <div>Loading Personal Data...</div>}
        </div>
      )}

      {isEditing === "viewing" && isSuccessPersonal && (
        <div className="lg:col-span-2">
          <h1>Profile</h1>
          <div>
            <div className="grid grid-cols-2">
              <h1>Full name:</h1>
              <p>{personalInfo.fullname}</p>
            </div>
            <div className="grid grid-cols-2">
              <h1>Email:</h1>
              <p>{personalInfo.email}</p>
            </div>
            <div className="grid grid-cols-2">
              <h1>Country:</h1>
              <p>{personalInfo.country}</p>
            </div>
            <div className="grid grid-cols-2">
              <h1>City:</h1>
              <p>{personalInfo.city}</p>
            </div>
            <div className="grid grid-cols-2">
              <h1>Phonenumber:</h1>
              <p>{personalInfo.phonenumber}</p>
            </div>
            <div className="grid grid-cols-2">
              <h1>Address:</h1>
              <p>{personalInfo.address}</p>
            </div>
            <div className="grid grid-cols-2">
              <h1>Date joined:</h1>
              <p>{formatDate(personalInfo.profile_created_at)}</p>
            </div>
            <div className="grid grid-cols-2">
              <h1>Is email verify:</h1>
              {personalInfo.is_verified === 1 ? (
                <p className="w-full bg-green-400 rounded-full text-center">
                  Verified
                </p>
              ) : (
                <p className="w-full bg-red-400 rounded-full text-center">
                  Not verified
                </p>
              )}
            </div>
          </div>
          <Button onClick={() => setIsEditing("editing")}>
            <HiPencil /> Edit Profile
          </Button>
        </div>
      )}

      <div className="col-span-1 space-y-4 text-center lg:text-left">
        <p className="text-xl font-semibold ">Update Prodile</p>
        <p>Profile of at least Size 300x300. Gifs work too. Max 5mb.</p>

        <div className="w-full flex justify-center">
          <div className="w-52 h-52 relative flex justify-center items-center rounded-full bg-gray-200">
            <img
              src="https://media.istockphoto.com/id/542183206/photo/richmond-virginia-usa-skyline.jpg?s=1024x1024&w=is&k=20&c=mZuIdrdFfnlLcKMU44x9yn9NmZxiu8pod0h2MRAS6Jk="
              alt="user-profile"
              className="rounded-full h-full w-full"
            />
            <div className="w-8 h-8 flex absolute bottom-10 right-0 items-center justify-center p-2 rounded-full bg-black">
              <HiPencil className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

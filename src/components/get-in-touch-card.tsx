import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getInTouchSchema } from "@/data/schemas/contact-schema";

const GetInTouchCard = () => {
  const form = useForm<z.infer<typeof getInTouchSchema>>({
    resolver: zodResolver(getInTouchSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof getInTouchSchema>) {
    console.log(values);
    form.reset();
  }
  return (
    <div className="flex-1 bg-white sm:p-10 p-3 w-full">
      <div className="title flex flex-col items-center mb-10">
        <h1 className="text-[34px] font-bold text-qblack">Get In Touch</h1>
        <span className="-mt-1 block">
          <svg
            className="w-72"
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
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 outline-none"
        >
          <div className="">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div>
                  <div className="">
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className=" outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </div>
              )}
            />
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div>
                  <div className="">
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="johndoe@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </div>
              )}
            />
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <div>
                  <div className="">
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your subject here" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </div>
              )}
            />
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <div>
                  <div className="">
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Type your message here"
                          // className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </div>
              )}
            />
          </div>
          <Button className="py-5 rounded-none w-full">
            <span>Send Now</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GetInTouchCard;

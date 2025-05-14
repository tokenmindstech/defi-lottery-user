"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  telegramId: z.string().min(1, "Telegram ID is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid phone number format"
    )
    .min(1, "Phone number is required")
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .optional(),
});

const GeneralForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      telegramId: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
  };
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
        Profile
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="telegramId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                    Telegram ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Telegram ID"
                      className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Phone Number"
                      className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Password"
                      className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="bg-bgtext-800 mask-l-from-80% mask-r-from-80%" />

          <div className="flex flex-col space-y-5">
            <h2 className="text-sm font-medium text-bgtext-100 font-inter whitespace-nowrap">
              Notification Preferences
            </h2>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GeneralForm;

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "OTP must be at least 6 characters long",
    })
    .max(6, {
      message: "OTP must be at most 6 characters long",
    }),
  secret: z.string().length(16, {
    message: "Secret must be exactly 16 characters long",
  }),
  qrCode: z.string(),
});

const Setup2FAForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      secret: "",
      qrCode: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-start space-y-5"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPGroup key={index}>
                      <InputOTPSlot
                        index={index}
                        className="h-16 w-14 bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end border-0 first:border-l-0 data-[active=true]:border-2 border-bgtext-800 text-4xl text-bgtext-100"
                      />
                    </InputOTPGroup>
                  ))}
                  <InputOTPSeparator />
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="bg-bgtext-800 mask-l-from-80% mask-r-from-80%" />

        <div className="w-full flex flex-row space-x-5 items-center justify-end">
          <Link href={"/auth"} passHref>
            <Button
              type="button"
              className="bggradient-to-b from-linblack-start to-linblack-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linblack-start hover:to-linblack-end rounded-lg cursor-pointer ease-out transition-all duration-300"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-lg cursor-pointer ease-out transition-all duration-300"
          >
            Activate
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Setup2FAForm;

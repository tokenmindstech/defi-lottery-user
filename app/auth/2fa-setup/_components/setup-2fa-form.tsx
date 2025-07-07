"use client";

import React, { useEffect, useRef } from "react";
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
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useMutation } from "@tanstack/react-query";
import { delay, fetchProxy } from "@/lib/utils";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import { signIn, signOut } from "next-auth/react";
import { AUTH_LOGIN_2FA } from "@/constant/common";
import { useRouter } from "next/navigation";

interface Setup2FAFormProps {
  secret: string;
  qrCode: string;
  token: string;
}

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

const Setup2FAForm = ({ qrCode, secret, token }: Setup2FAFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      secret,
      qrCode,
    },
  });

  // Create a ref for the first OTP input
  const firstInputRef = useRef<HTMLInputElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const isErrorResponse = (
    response: APIBind2FAResponseDTO | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const mutation = useMutation<
    APIBind2FAResponseDTO | APIBaseErrorResponse,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: ["bind-2fa"],
    mutationFn: async (data) =>
      fetchProxy({
        method: "POST",
        url: "two-factor/bind",
        body: {
          otp: data.otp,
          secret: data.secret,
          qrCode: data.qrCode,
        },
        customHeaders: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await mutation.mutateAsync(data);
      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message
        );
        return;
      }

      toast.success("2FA activated successfully");
      await signIn("credentials", {
        type: AUTH_LOGIN_2FA,
        accessToken: result.data.access_token,
        user: JSON.stringify(result.data.user),
        redirect: false,
      });

      await delay(2000);
      if (!result.data.user.subscription) {
        router.push("/auth/subscription-offers");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  // Focus the first OTP input when component mounts with a slight delay
  useEffect(() => {
    // Using a short timeout to ensure the component is fully rendered
    const timer = setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      } else if (formContainerRef.current) {
        // Try to find the input directly if the ref doesn't work
        const input =
          formContainerRef.current.querySelector('input[type="text"]');
        if (input) {
          (input as HTMLInputElement).focus();
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={formContainerRef}>
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
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    autoFocus={true}
                    {...field}
                  >
                    {Array.from({ length: 6 }, (_, index) => (
                      <InputOTPGroup key={index}>
                        <InputOTPSlot
                          ref={index === 0 ? firstInputRef : undefined}
                          index={index}
                          className="size-10 md:size-12 lg:size-14 bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end border-0 first:border-l-0 data-[active=true]:border-2 border-bgtext-800 text-3xl md:text-4xl text-bgtext-100"
                        />
                      </InputOTPGroup>
                    ))}
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="bg-bgtext-800 mask-l-from-80% mask-r-from-80%" />

          <div className="w-full flex flex-row space-x-5 items-center justify-end">
            <Button
              type="button"
              disabled={form.formState.isSubmitting}
              onClick={() =>
                signOut({ redirect: true, callbackUrl: "/auth?action=logout" })
              }
              className="bggradient-to-b from-linblack-start to-linblack-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linblack-start hover:to-linblack-end rounded-lg cursor-pointer ease-out transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-lg cursor-pointer ease-out transition-all duration-300"
            >
              {form.formState.isSubmitting ? (
                <div className="flex flex-row items-center justify-center space-x-2">
                  <SpinnerIcon className="size-5 fill-bgtext-100 animate-spin" />
                  <p className="text-bgtext-100 font-inter font-medium text-base">
                    Activating...
                  </p>
                </div>
              ) : (
                "Activate"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Setup2FAForm;

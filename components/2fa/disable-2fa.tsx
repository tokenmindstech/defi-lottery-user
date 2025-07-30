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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface DisableTwoFactorProps {
  setOpen: (open: boolean) => void;
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
});

const DisableTwoFactor = ({ setOpen }: DisableTwoFactorProps) => {
  const { data: userSession, update } = useSession();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Refs
  const firstInputRef = useRef<HTMLInputElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const isErrorResponse = (
    response: API2FAVerifyResponseDTO | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const mutation = useMutation<
    API2FAVerifyResponseDTO | APIBaseErrorResponse,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: ["disable-2fa"],
    mutationFn: async (data) =>
      fetchProxy({
        method: "DELETE",
        url: "two-factor/unbind",
        body: {
          otp: data.otp,
        },
        auth: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", userSession?.user.id],
        refetchType: "all",
      });
    },
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

      // Update session token in NextAuth
      await update({
        accessToken: result.data.access_token,
        user: {
          name: result.data.user.name,
          email: result.data.user.email,
          roles: result.data.user.roles,
          verifiers: result.data.user.verifiers,
          isTwoFactorSetup: result.data.user.isTwoFactorSetup,
        },
      });

      toast.success("2FA removed successfully!");

      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      } else if (formContainerRef.current) {
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
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(onSubmit)(e);
          }}
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
                          index={index}
                          ref={index === 0 ? firstInputRef : null}
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
              onClick={() => setOpen(false)}
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
                    Submitting...
                  </p>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DisableTwoFactor;

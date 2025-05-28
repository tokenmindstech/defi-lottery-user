"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { fetchProxy } from "@/lib/utils";
import { Gift, Spinner } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Separator } from "@radix-ui/react-separator";
import { useSession } from "next-auth/react";

interface ClaimRewardButtonProps {
  totalClaimable: number;
  page: number;
  limit: number;
  search: string | null | undefined;
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
type FormType = z.infer<typeof formSchema>;

const ClaimRewardButton = ({
  totalClaimable,
  page,
  limit,
  search,
}: ClaimRewardButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: userSession } = useSession();
  const queryClient = useQueryClient();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Refs
  const firstInputRef = useRef<HTMLInputElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation<
    APIClaimRewardResponseDTO | APIBaseErrorResponse,
    Error,
    FormType
  >({
    mutationKey: ["claim-reward"],
    mutationFn: async (data) => {
      return await fetchProxy({
        method: "POST",
        url: "draw-ticket/claim",
        auth: true,
        body: {
          otp: data.otp,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["claim-rewards-stats", userSession?.user.id],
          ["claim-rewards-history", userSession?.user.id, page, limit, search],
        ],
      });
    },
  });

  const isErrorResponse = (
    response: APIClaimRewardResponseDTO | APIBaseErrorResponse
  ): response is APIClaimRewardResponseDTO => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const onSubmit = async (data: FormType) => {
    try {
      const response = await mutation.mutateAsync(data);
      if (isErrorResponse(response)) {
        toast.error(
          Array.isArray(response.message)
            ? response.message[0]
            : response.message
        );
        return;
      }

      toast.success("Reward claimed successfully!");
      setIsOpen(false);
      // Optionally, you can trigger a refetch of the tickets or update the UI accordingly
      form.reset();
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("Failed to claim reward. Please try again.");
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={totalClaimable === 0}
          className="bg-gradient-to-b p-5 from-linprimary-start to-linprimary-end border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300"
        >
          <div className="flex flex-row space-x-3 items-center justify-start">
            <Gift className="size-5 text-bgtext-100" />
            <p className="text-bgtext-100 font-inter font-medium text-sm py-4 whitespace-nowrap">
              Claim Reward
            </p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm md:max-w-md h-fit overflow-y-auto bg-black border-1 border-bgtext-800 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-bgtext-100 font-inter font-semibold text-lg text-left">
            Input OTP to Claim Reward
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
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

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-lg cursor-pointer ease-out transition-all duration-300"
            >
              {form.formState.isSubmitting ? (
                <div className="flex flex-row items-center justify-center space-x-2">
                  <Spinner className="size-5 fill-bgtext-100 animate-spin" />
                  <p className="text-bgtext-100 font-inter font-medium text-base">
                    Claiming...
                  </p>
                </div>
              ) : (
                "Claim Reward"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardButton;

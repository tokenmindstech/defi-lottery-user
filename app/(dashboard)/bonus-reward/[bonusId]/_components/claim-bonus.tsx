"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GiftIcon, SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, fetchProxy, truncateString } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const formSchema = z.object({
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  category: z.enum(["CLAIM BONUS"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),
  fileAttachments: z.array(z.instanceof(File)).optional(),
});

interface ClaimBonusProps {
  bonus: BonusDetail;
}

const ClaimBonus = ({ bonus }: ClaimBonusProps) => {
  const { data: userSession } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const isUserWinner = bonus.bonusWinners.some(
    (winner) => winner.user.id === userSession?.user.id
  );
  const userWinner = isUserWinner
    ? bonus.bonusWinners.find(
        (winner) => winner.user.id === userSession?.user.id
      )
    : null;
  const isOngoingRaffle = dayjs()
    .tz("Asia/Singapore")
    .isBefore(dayjs(bonus.validAt).tz("Asia/Singapore"));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: `Claiming bonus: ${bonus.name}`,
      description: "",
      category: "CLAIM BONUS",
      fileAttachments: [],
    },
  });

  const handleResetForm = () => {
    form.reset();
  };

  const mutation = useMutation<
    API2FAVerifyResponseDTO | APIBaseErrorResponse,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: ["create-ticket-support", form.getValues("subject")],
    mutationFn: async (data) => {
      const payload = {
        subject: data.subject,
        description: data.description,
        category: data.category,
        contactPreference: "TELEGRAM",
        attachments: [],
      };
      const response = await fetchProxy({
        method: "POST",
        url: "support-ticket",
        body: payload,
        auth: true,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["query-support-tickets", userSession?.user.id],
      });
    },
  });

  const isErrorResponse = (
    response: API2FAVerifyResponseDTO | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await mutation.mutateAsync(data);
      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message
        );
        return;
      }

      toast.success("Ticket created successfully");
      handleResetForm();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Error creating ticket");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-b p-5 from-linprimary-start to-linprimary-end border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300"
          disabled={!isUserWinner}
        >
          <div className="flex flex-row space-x-3 items-center justify-start">
            <GiftIcon className="size-5 text-bgtext-100" />
            <p className="text-bgtext-100 font-inter font-medium text-sm py-4 whitespace-nowrap">
              {isUserWinner && userWinner
                ? userWinner.claimed === false
                  ? "Claim Bonus 🎉"
                  : "Bonus Claimed ✅"
                : isOngoingRaffle
                ? "Ongoing Raffle 👀"
                : "Unfortunately, you are not a winner this time 😢"}
            </p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm md:max-w-md h-fit max-h-[80vh] overflow-y-auto bg-black border-1 border-bgtext-800 rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <DialogHeader>
              <DialogTitle className="text-bgtext-100 font-inter font-semibold text-lg text-left">
                Claim {truncateString(bonus.name, 30)}
              </DialogTitle>
              <DialogDescription className="text-bgtext-500 font-inter font-medium text-sm text-left">
                Congratulations on your bonus reward✨
                <br />
                Please fill out this form to claim your{" "}
                {truncateString(bonus.name, 30)}.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bgtext-100 font-inter font-semibold text-sm gap-1">
                    Subject
                    <span className="text-sm text-destructive pl-0">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled
                      readOnly
                      placeholder="Enter the subject of your ticket"
                      className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bgtext-100 font-inter font-semibold text-sm gap-1">
                    Category
                    <span className="text-sm text-destructive pl-0">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 w-full"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 bg-bgtext-900 border border-bgtext-800 p-3 rounded-xl">
                        <FormControl>
                          <RadioGroupItem
                            className={cn(
                              "border-bgtext-800",
                              field.value === "CLAIM BONUS" &&
                                "bg-linprimary-start"
                            )}
                            value={"CLAIM BONUS"}
                          />
                        </FormControl>
                        <FormLabel className="flex flex-row items-center justify-between w-full space-x-2">
                          <p className="font-normal text-bgtext-100 font-inter text-base w-full cursor-pointer">
                            Claim Bonus
                          </p>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bgtext-100 font-inter font-semibold text-sm gap-1">
                    Description
                    <span className="text-sm text-destructive pl-0">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your preferred contact method, we will reach out to you and assist you with the claim process."
                      className="w-full h-32 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row space-x-2 items-center justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-fit bg-bgtext-800 border border-bgtext-700 hover:bg-bgtext-700 rounded-lg cursor-pointer text-bgtext-100 hover:text-bgtext-100"
                onClick={() => {
                  setIsOpen(false);
                  handleResetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-gradient-to-b p-5 from-linprimary-start to-linprimary-end border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <SpinnerIcon className="size-5 fill-bgtext-100 animate-spin" />
                    <p className="text-bgtext-100 font-inter font-medium text-sm">
                      Submitting Claim...
                    </p>
                  </div>
                ) : (
                  <p className="text-bgtext-100 font-inter font-medium text-sm py-4 whitespace-nowrap">
                    Claim Bonus
                  </p>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimBonus;

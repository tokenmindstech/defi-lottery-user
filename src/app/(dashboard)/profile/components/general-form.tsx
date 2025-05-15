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
import { Separator } from "@/components/ui/separator";
import { EnvelopeSimple, TelegramLogo } from "@phosphor-icons/react/dist/ssr";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  telegramId: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),

  notificationPreferences: z.enum(["TELEGRAM", "GOOGLE"]),
  twoFactorAuth: z.boolean(),
});

interface GeneralFormProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  verifiers: Verifier[];
}

const GeneralForm = ({
  isEditing,
  setIsEditing,
  verifiers,
}: GeneralFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      telegramId: verifiers.find((verifier) => verifier.type === "TELEGRAM")
        ?.id,
      email: verifiers.find((verifier) => verifier.type === "GOOGLE")?.id,
      notificationPreferences: (() => {
        const preferredVerifier = verifiers.find(
          (verifier) => verifier.preferNotification
        );
        if (preferredVerifier?.type === "GOOGLE") return "GOOGLE";
        return "TELEGRAM";
      })(),
      twoFactorAuth: true,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success("Profile updated successfully");
    console.log("Form submitted:", data);
    setIsEditing(false);
  };

  const handleResetForm = () => {
    form.reset();
    setIsEditing(false);
  };
  return (
    <div className="flex flex-col space-y-5 p-2">
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
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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

            <div className="flex flex-row items-center justify-start space-x-10">
              {verifiers.some((verifier) => verifier.type === "TELEGRAM") && (
                <FormField
                  name="notificationPreferences"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="bg-bgtext-100 rounded-full p-1">
                          <TelegramLogo className="text-bgtext-900 size-4" />
                        </div>
                        <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                          Telegram
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          id="telegram"
                          checked={field.value === "TELEGRAM"}
                          disabled={!isEditing}
                          className={cn(
                            "w-8 h-5 cursor-pointer data-[state=checked]:bg-linprimary-start data-[state=unchecked]:bg-linblack-start",
                            !isEditing && "cursor-not-allowed opacity-70"
                          )}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "TELEGRAM" : "GOOGLE")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {verifiers.some((verifier) => verifier.type === "GOOGLE") && (
                <FormField
                  name="notificationPreferences"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="bg-bgtext-100 rounded-full p-1">
                          <EnvelopeSimple className="text-bgtext-900 size-4" />
                        </div>
                        <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                          Email
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          id="email"
                          checked={field.value === "GOOGLE"}
                          disabled={!isEditing}
                          className={cn(
                            "w-8 h-5 cursor-pointer data-[state=checked]:bg-linprimary-start data-[state=unchecked]:bg-linblack-start",
                            !isEditing && "cursor-not-allowed opacity-70"
                          )}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "GOOGLE" : "TELEGRAM")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <Separator className="bg-bgtext-800 mask-l-from-80% mask-r-from-80%" />

          <div className="flex flex-col space-y-5">
            <h2 className="text-sm font-medium text-bgtext-100 font-inter whitespace-nowrap">
              Two-Factor Authentication
            </h2>

            <div className="flex flex-row items-center justify-start space-x-10">
              <FormField
                name="twoFactorAuth"
                control={form.control}
                render={() => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Switch
                        disabled
                        checked={true}
                        className={cn(
                          "w-8 h-5 cursor-not-allowed data-[state=checked]:bg-linprimary-start opacity-70"
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex flex-row items-center justify-end space-x-5">
              <Button
                type="button"
                onClick={handleResetForm}
                className="bg-bgtext-800 border-2 border-bgtext-700 hover:bg-bgtext-700 rounded-lg cursor-pointer"
              >
                Reset to Default
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-lg cursor-pointer ease-out transition-all duration-300"
              >
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default GeneralForm;

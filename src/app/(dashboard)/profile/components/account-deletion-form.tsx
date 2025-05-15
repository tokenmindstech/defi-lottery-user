"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner, Trash } from "@phosphor-icons/react/dist/ssr";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { delay, fetchProxy } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

// Define schema without the refine to avoid TypeScript errors
const formSchema = z.object({
  confirmation: z.string().min(1, { message: "Confirmation is required" }),
});

// Define the form values type
type FormValues = z.infer<typeof formSchema>;

const AccountDeletionForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmation: "",
    },
    mode: "onChange",
  });

  const mutation = useMutation<
    APIBaseResponse | APIBaseErrorResponse,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: ["delete-account"],
    mutationFn: async () => {
      const response = await fetchProxy({
        method: "DELETE",
        url: "user/account",
        auth: true,
        body: {},
      });
      return response;
    },
  });

  const isErrorResponse = (
    response: APIBaseResponse | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Check if the confirmation text matches exactly
      if (data.confirmation !== "DELETE MY ACCOUNT") {
        form.setError("confirmation", {
          type: "manual",
          message: "Please type 'DELETE MY ACCOUNT' to confirm",
        });
        return;
      }

      const result = await mutation.mutateAsync(data);
      console.log("result", result);
      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message
        );
        return;
      }

      toast.success("Account deleted successfully!, redirecting...");
      await delay(3000);
      signOut({ redirect: true, callbackUrl: "/auth?action=logout" });
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsOpen(false);
      form.reset();
    }
  };

  // Handle dialog close to reset form
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          Delete My Account
          <Trash className="size-5 text-bgtext-100" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm md:max-w-md bg-bgtext-900 border-1 border-bgtext-800 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-bgtext-100 font-inter font-semibold text-lg text-left">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-bgtext-500 font-inter font-medium text-sm text-left">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                    Type &quot;DELETE MY ACCOUNT&quot; to confirm
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="DELETE MY ACCOUNT"
                      className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-row space-x-2 items-center justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-fit bg-bgtext-800 border border-bgtext-700 hover:bg-bgtext-700 rounded-lg cursor-pointer text-bgtext-100 hover:text-bgtext-100"
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                variant="destructive"
                className="cursor-pointer"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <Spinner className="size-5 fill-bgtext-100 animate-spin" />
                    <p className="text-bgtext-100 font-inter font-medium text-sm">
                      Deleting your account...
                    </p>
                  </div>
                ) : (
                  <p className="text-bgtext-100 font-inter font-medium text-sm">
                    Delete My Account
                  </p>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDeletionForm;

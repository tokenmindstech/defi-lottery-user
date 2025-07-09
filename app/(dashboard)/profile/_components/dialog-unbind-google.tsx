"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { fetchProxy } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";

interface DialogUnbindGoogleProps {
  userInfoResponse: UserInfoResponse;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogUnbindGoogle = ({
  userInfoResponse,
  setIsEditing,
}: DialogUnbindGoogleProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: userSession } = useSession();

  const mutation = useMutation<
    APIBaseResponse | APIBaseErrorResponse,
    Error,
    Verifier[]
  >({
    mutationKey: ["update-account"],
    mutationFn: async (data: Verifier[]) =>
      fetchProxy({
        method: "PATCH",
        url: "user/profile",
        body: {
          name: userInfoResponse.name,
          verifiers: data,
        },
        auth: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", userSession?.user.id],
      });
    },
  });

  const isErrorResponse = (
    response: APIBaseResponse | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const unbindGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      const newVerifiers = userInfoResponse.verifiers.filter(
        (verifier) => verifier.type !== "GOOGLE"
      );

      const result = await mutation.mutateAsync([
        {
          ...newVerifiers[0],
          preferNotification: true,
        },
      ]);

      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message,
          {
            id: `unbind-google-error-${userSession?.user.id}`,
          }
        );
        return;
      }

      toast.success("Unbind Google successfully", {
        id: `unbind-google-success-${userSession?.user.id}`,
      });
      setIsOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Unbind failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    userInfoResponse.verifiers,
    mutation,
    userSession?.user.id,
    setIsEditing,
  ]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          type="button"
          className="w-fit text-destructive cursor-pointer px-0"
        >
          {isLoading ? "Unbinding..." : "Unbind Google"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-md bg-bgtext-900 border-1 border-bgtext-800 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-bgtext-100 font-inter font-semibold text-lg text-left">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action will unbind your Google account from your profile.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row space-x-2 items-center justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-fit bg-bgtext-800 border border-bgtext-700 hover:bg-bgtext-700 rounded-lg cursor-pointer text-bgtext-100 hover:text-bgtext-100"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={unbindGoogle}
            disabled={isLoading}
            variant="destructive"
            className="cursor-pointer"
          >
            {isLoading ? (
              <div className="flex flex-row items-center justify-center space-x-2">
                <SpinnerIcon className="size-5 fill-bgtext-100 animate-spin" />
                <p className="text-bgtext-100 font-inter font-medium text-sm">
                  Unbinding...
                </p>
              </div>
            ) : (
              <p className="text-bgtext-100 font-inter font-medium text-sm">
                Unbind Google
              </p>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUnbindGoogle;

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
import { Plus, Spinner } from "@phosphor-icons/react/dist/ssr";
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
import { TICKET_ISSUE_ITEMS } from "@/constant/common";
import { cn, fetchProxy, toBase64 } from "@/lib/utils";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  category: z.enum(["BILLING", "ACCOUNT", "TECHNICAL", "OTHER"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),
  fileAttachments: z.array(z.instanceof(File)).optional(),
});

const MAX_FILES = 4;

const OpenTicketForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [temporaryImages, setTemporaryImages] = useState<string[]>([]);
  const [temporaryFiles, setTemporaryFiles] = useState<File[]>([]);

  const queryClient = useQueryClient();
  const { data: userSession } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
      category: "OTHER",
      fileAttachments: [],
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    // Convert FileList to Array for easier processing
    const newFiles = Array.from(event.target.files);

    // Limit number of files to be added
    const filesToAdd = newFiles.slice(0, MAX_FILES - temporaryImages.length);

    if (filesToAdd.length === 0) return;

    // Process all files and get their base64 representations
    const processedFiles = await Promise.all(
      filesToAdd.map(async (file) => {
        const base64 = await toBase64(file);
        return { file, base64: base64 as string };
      })
    );

    // Update the state with all new files
    setTemporaryFiles((prev) => [
      ...prev,
      ...processedFiles.map((item) => item.file),
    ]);
    setTemporaryImages((prev) => [
      ...prev,
      ...processedFiles.map((item) => item.base64),
    ]);

    form.setValue(
      "fileAttachments",
      [...temporaryFiles, ...processedFiles.map((item) => item.file)],
      { shouldValidate: true }
    );
  };

  const handleUploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    if (temporaryFiles.length > 0) {
      for (const file of temporaryFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResult = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/upload?folderName=supports`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResult.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await uploadResult.json();
        uploadedUrls.push(result.url);
      }

      // Clear temporary files after successful upload
      setTemporaryFiles([]);
      setTemporaryImages([]);
    }

    return uploadedUrls;
  };

  const handleRemoveImage = (index: number) => {
    setTemporaryImages((prev) => prev.filter((_, i) => i !== index));
    setTemporaryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleResetForm = () => {
    setTemporaryImages([]);
    setTemporaryFiles([]);
    form.reset();
  };

  const mutation = useMutation<
    API2FAVerifyResponseDTO | APIBaseErrorResponse,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: ["create-ticket-support", form.getValues("subject")],
    mutationFn: async (data) => {
      let attachments: string[] = [];
      if (temporaryFiles.length > 0) {
        toast.loading("Uploading attachments...");
        attachments = await handleUploadImages();
      }
      const payload = {
        subject: data.subject,
        description: data.description,
        category: data.category,
        contactPreference: "TELEGRAM",
        attachments,
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
        <Button className="bg-gradient-to-b p-5 from-linprimary-start to-linprimary-end border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300">
          <div className="flex flex-row space-x-3 items-center justify-start">
            <Plus className="size-5 text-bgtext-100" />
            <p className="text-bgtext-100 font-inter font-medium text-sm py-4 whitespace-nowrap">
              Open a Ticket
            </p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm md:max-w-md h-full max-h-[80vh] overflow-y-auto bg-black border-1 border-bgtext-800 rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <DialogHeader>
              <DialogTitle className="text-bgtext-100 font-inter font-semibold text-lg text-left">
                Open a Ticket
              </DialogTitle>
              <DialogDescription className="text-bgtext-500 font-inter font-medium text-sm text-left">
                Fill out the form below to open a ticket. Our support team will
                get back to you as soon as possible.
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
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 w-full"
                    >
                      {TICKET_ISSUE_ITEMS.map((item, idx) => (
                        <FormItem
                          key={idx}
                          className="flex items-center space-x-3 space-y-0 bg-bgtext-900 border border-bgtext-800 p-3 rounded-xl"
                        >
                          <FormControl>
                            <RadioGroupItem
                              className={cn(
                                "border-bgtext-800",
                                field.value === item.value &&
                                  "bg-linprimary-start"
                              )}
                              value={item.value}
                            />
                          </FormControl>
                          <FormLabel className="flex flex-row items-center justify-between w-full space-x-2">
                            <p className="font-normal text-bgtext-100 font-inter text-base w-full cursor-pointer">
                              {item.label}
                            </p>
                          </FormLabel>
                        </FormItem>
                      ))}
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
                      placeholder="Enter the description of your ticket"
                      className="w-full h-32 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileAttachments"
              render={() => (
                <FormItem className="space-y-0.5 w-full px-1">
                  <FormLabel className="text-bgtext-100 font-inter font-semibold text-sm gap-1">
                    Attachments
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div
                        className={`border border-dashed border-soft-border rounded-md p-5 text-center ${
                          temporaryImages.length < MAX_FILES
                            ? "cursor-pointer hover:border-soft-border"
                            : ""
                        } transition-colors`}
                        onClick={() => {
                          if (temporaryImages.length < MAX_FILES) {
                            document.getElementById("files-input")?.click();
                          }
                        }}
                      >
                        {temporaryImages.length > 0 ? (
                          <div className="flex flex-col w-full h-full items-center justify-center">
                            <div
                              className={`grid ${
                                temporaryImages.length === 1
                                  ? "grid-cols-1"
                                  : "grid-cols-2"
                              } gap-2 w-full`}
                            >
                              {temporaryImages.map((img, index) => (
                                <div key={index} className="relative group">
                                  <div className="w-full aspect-square relative">
                                    <Image
                                      src={img}
                                      alt={`Image preview ${index + 1}`}
                                      fill
                                      sizes="100%"
                                      className="object-cover rounded-md"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveImage(index);
                                    }}
                                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="text-white"
                                    >
                                      <path d="M18 6L6 18M6 6l12 12"></path>
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <p className="text-lg font-montserrat tracking-tight mb-1 text-neutral-100">
                              + Upload image
                            </p>
                            <p className="text-sm font-montserrat tracking-tight text-neutral-300">
                              (jpg, jpeg, png, max: 5mb)
                            </p>
                          </div>
                        )}
                        {temporaryImages.length > 0 &&
                          temporaryImages.length < MAX_FILES && (
                            <div className="mt-3">
                              <p className="text-sm font-montserrat tracking-tight text-neutral-300">
                                Click to add more images (
                                {MAX_FILES - temporaryImages.length} remaining)
                              </p>
                            </div>
                          )}
                      </div>
                      {temporaryImages.length < MAX_FILES && (
                        <Input
                          id="files-input"
                          type="file"
                          multiple
                          max={MAX_FILES}
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          className="sr-only absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleImageChange}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
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
                    <Spinner className="size-5 fill-bgtext-100 animate-spin" />
                    <p className="text-bgtext-100 font-inter font-medium text-sm">
                      Submitting Ticket...
                    </p>
                  </div>
                ) : (
                  <p className="text-bgtext-100 font-inter font-medium text-sm py-4 whitespace-nowrap">
                    Submit Ticket
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

export default OpenTicketForm;

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
import { cn, toBase64 } from "@/lib/utils";
import Image from "next/image";

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
  files: z.array(z.instanceof(File)).optional(),
});

const OpenTicketForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [temporaryImages, setTemporaryImages] = useState<string[]>([]);
  const [temporaryFiles, setTemporaryFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
      category: "OTHER",
      files: [],
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const base64 = await toBase64(file as File);
      setTemporaryFiles((prev) => [...prev, file]);
      setTemporaryImages((prev) => [...prev, base64 as string]);
    }
  };

  const handleResetForm = () => {
    setTemporaryImages([]);
    setTemporaryFiles([]);
    form.reset();
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted", data);
    // Handle form submission logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              name="files"
              render={() => (
                <FormItem className="space-y-0.5 w-full px-1">
                  <FormLabel className="text-sm font-montserrat text-neutral-300 font-medium">
                    Upload Your Team Logo
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div
                        className={`border border-dashed border-soft-border rounded-md p-5 text-center cursor-pointer hover:border-soft-border transition-colors`}
                        onClick={() =>
                          document.getElementById("files-input")?.click()
                        }
                      >
                        {temporaryImages.length > 0 ? (
                          <div className="flex flex-col w-full h-full items-center justify-center">
                            <div className="flex relative w-40 h-40">
                              <Image
                                src={temporaryImages[0]}
                                alt="Team logo preview"
                                fill
                                sizes="100%"
                                className="object-cover"
                              />
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
                      </div>
                      <Input
                        id="files-input"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        max={3}
                        className="sr-only absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
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
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default OpenTicketForm;

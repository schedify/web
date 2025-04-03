"use client";

import { LucideLoader2, LucidePlus } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { validateWebhookCreate } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const CreateWebhookModel = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof validateWebhookCreate>>({
    resolver: zodResolver(validateWebhookCreate),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof validateWebhookCreate>) {
    setIsSubmitting(true);

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/webhooks/`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res = await resp.json();
    if (!res.status) {
      setIsSubmitting(false);

      return toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }

    toast({
      title: "Success",
      description: res.message,
    });

    router.push(`/webhooks/${res.data.webhookId}`);
  }

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col items-center justify-center shadow-2xl gap-3 rounded-lg min-h-[200px] hero-gradient text-primary cursor-pointer border-primary group hover:shadow-xl duration-100">
            <LucidePlus
              className="group-hover:rotate-180 duration-150"
              size={24}
            />
            <span className="text-xl font-geist-sans font-semibold">
              Setup webhook
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader>
              <DialogTitle>Create Webhook</DialogTitle>
              <DialogDescription>
                Set up your webhook details here. Click "Save" to create it.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Creating…
                    <LucideLoader2 className="animate-spin" />
                  </>
                ) : (
                  <>
                    Create
                    <LucidePlus />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

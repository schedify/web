"use client";

import { CalendarIcon, LucideLoader2, LucidePlus } from "lucide-react";
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
import { validateScheduleBody } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AceEditor from "react-ace";

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
import { Fira_Code } from "next/font/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ScheduleEventDialog = ({
  accessToken,
  webhookId,
}: {
  accessToken: string;
  webhookId: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof validateScheduleBody>>({
    resolver: zodResolver(validateScheduleBody),
    defaultValues: {
      event: "",
      payload: "",
      scheduledFor: undefined,
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof validateScheduleBody>) {
    setIsSubmitting(true);

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/webhooks/${webhookId}/events`,
      {
        method: "POST",
        body: JSON.stringify({
          scheduled_for: values.scheduledFor,
          event_name: values.event,
          payload: JSON.parse(values.payload),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
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

    setDialogOpen(false);
    router.refresh();
  }

  return (
    <Form {...form}>
      <Dialog open={dialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
        <DialogTrigger asChild>
          <Button
            variant={"default"}
            className="rounded-full bg-blue-600 hover:bg-blue-500 font-bold max-md:self-end"
          >
            <LucidePlus className="stroke-[3px]" />
            Schedule Event
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>
                Set up your webhook details here. Click "Save" to create it.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduledFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Process at</FormLabel>
                  <FormControl>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal w-full",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            moment(field.value).format("LL, h:mm A")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 flex flex-row gap-3"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date)
                              return form.setValue("scheduledFor", date);
                            form.setValue(
                              "scheduledFor",
                              moment().add(1, "d").toDate(),
                            );
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />

                        <div className="flex flex-col items-center py-5 gap-1">
                          <label className="text-xs font-medium tracking-wide text-muted-foreground">
                            HH
                          </label>
                          <ScrollArea
                            className="max-h-[220px] my-auto overflow-y-auto"
                            type="scroll"
                          >
                            <div className="flex flex-col">
                              {new Array(12).fill(1).map((_, i) => {
                                const hour = moment(field.value).hour();

                                return (
                                  <Button
                                    variant={
                                      (hour === 12 && i == 11) ||
                                      hour % 12 === i + 1
                                        ? "secondary"
                                        : "ghost"
                                    }
                                    size="sm"
                                    key={i.toString()}
                                    onClick={() => {
                                      form.setValue(
                                        "scheduledFor",
                                        moment(field.value)
                                          .set("hour", i + 1)
                                          .toDate(),
                                      );
                                    }}
                                  >
                                    {i + 1}
                                  </Button>
                                );
                              })}
                            </div>
                          </ScrollArea>
                        </div>

                        <div className="flex flex-col items-center py-5 gap-1">
                          <label className="text-xs font-medium tracking-wide text-muted-foreground">
                            MM
                          </label>
                          <ScrollArea
                            className="max-h-[220px] my-auto  overflow-y-auto"
                            type="scroll"
                          >
                            <div className="flex flex-col">
                              {new Array(60).fill(1).map((_, i) => {
                                const minute = moment(field.value).minute();

                                return (
                                  <Button
                                    variant={
                                      (minute === 60 && i == 59) ||
                                      minute % 60 === i
                                        ? "secondary"
                                        : "ghost"
                                    }
                                    size="sm"
                                    key={i.toString()}
                                    onClick={() => {
                                      form.setValue(
                                        "scheduledFor",
                                        moment(field.value)
                                          .set("minute", i)
                                          .toDate(),
                                      );
                                    }}
                                  >
                                    {i}
                                  </Button>
                                );
                              })}
                            </div>
                          </ScrollArea>
                        </div>

                        <div className="flex flex-col items-center py-5 gap-1 pr-4">
                          <label className="text-xs font-medium tracking-wide text-muted-foreground">
                            PERIOD
                          </label>

                          <div className="flex flex-col gap-1">
                            <Button
                              variant={
                                moment(field.value).hour() < 12
                                  ? "secondary"
                                  : "ghost"
                              }
                              size="sm"
                              onClick={() => {
                                form.setValue(
                                  "scheduledFor",
                                  moment(field.value)
                                    .set(
                                      "hour",
                                      moment(field.value).hour() % 12,
                                    )
                                    .toDate(),
                                );
                              }}
                            >
                              AM
                            </Button>

                            <Button
                              variant={
                                moment(field.value).hour() > 12
                                  ? "secondary"
                                  : "ghost"
                              }
                              size="sm"
                              onClick={() => {
                                form.setValue(
                                  "scheduledFor",
                                  moment(field.value)
                                    .set(
                                      "hour",
                                      (moment(field.value).hour() % 12) + 12,
                                    )
                                    .toDate(),
                                );
                              }}
                            >
                              PM
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payload</FormLabel>
                  <FormControl>
                    <div className="w-full rounded-md border border-input bg-transparent px-3 py-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <AceEditor
                        style={{
                          width: "100%",
                          height: 200,
                        }}
                        mode="json"
                        theme="xcode"
                        wrapEnabled
                        highlightActiveLine={false}
                        showGutter={false}
                        editorProps={{ $blockScrolling: true }}
                        value={field.value}
                        onChange={(value) => form.setValue("payload", value)}
                      />
                    </div>
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

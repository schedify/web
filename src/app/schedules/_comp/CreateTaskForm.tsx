"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateScheduleBody, ValidateScheduleBodyT } from "@/lib/zod";
import { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  appendUserTimezoneIfMissing,
  cn,
  isValidDateObject,
  isValidJSON,
} from "@/lib/utils";
import moment from "moment";
import { CalendarIcon, LucideLoader2, LucidePlus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/theme-github_dark";
import "ace-builds/src-min-noconflict/theme-nord_dark";

import "ace-builds/src-min-noconflict/mode-json";
import "ace-builds/src-min-noconflict/mode-sh";

export const CreateTaskForm: FC<{ samplePosition: "right" | "bottom" }> = ({
  samplePosition,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ValidateScheduleBodyT>({
    resolver: zodResolver(validateScheduleBody),
    defaultValues: {
      name: "",
      payload: JSON.stringify(
        { campaign: "welcome", email: "samir@schedify.dev" },
        null,
        2
      ),
      time: undefined,
      url: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: ValidateScheduleBodyT) {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        time: isValidDateObject(values.time)
          ? values.time
          : appendUserTimezoneIfMissing(values.time),
        payload: JSON.parse(values.payload),
      }),
    });

    const res = await resp.json();
    if (res.status === 0) {
      setIsSubmitting(false);
      return toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }

    toast({
      title: "Success",
      description: "Task has been scheduled!",
    });

    return router.push(`/schedules/${res.data.webhookId}`);
  }

  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-0 divide-x divide-border",
        samplePosition === "right" && "grid-cols-1 md:grid-cols-2"
      )}
    >
      <div className="p-6 space-y-3">
        <h3 className="text-2xl font-semibold tracking-tight">
          No Login Needed
        </h3>
        <p className="leading-6 text-sm">Schedule tasks without signing in.</p>

        <hr className="border-b border-border" />

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="send:email" />
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
                      <Input
                        {...field}
                        placeholder="https://api.your-app.com/send-emails"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <div className="flex flex-row ">
                        <Input
                          {...field}
                          placeholder="Tomorrow at 12:00 PM IST"
                          className="flex-1"
                          value={
                            isValidDateObject(field.value)
                              ? moment(field.value).format(
                                  "hh:mm A - DD/MM/YYYY"
                                )
                              : field.value || ""
                          }
                        />

                        <Popover modal>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal bg-transparent",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 flex flex-row gap-3"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={
                                isValidDateObject(field.value)
                                  ? new Date(field.value)
                                  : undefined
                              }
                              onSelect={(date) => {
                                let time = moment().add(1, "d").toISOString();
                                if (date) {
                                  time = date.toISOString();
                                }

                                form.setValue("time", time);
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
                                    const isActive =
                                      (hour === 12 && i == 11) ||
                                      hour % 12 === i + 1;

                                    return (
                                      <Button
                                        variant={
                                          isActive ? "secondary" : "ghost"
                                        }
                                        size="sm"
                                        key={i.toString()}
                                        onClick={() => {
                                          let time = moment(field.value)
                                            .set("hour", i + 1)
                                            .toISOString();

                                          form.setValue("time", time);
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
                                    const isActive =
                                      (minute === 60 && i == 59) ||
                                      minute % 60 === i;

                                    return (
                                      <Button
                                        variant={
                                          isActive ? "secondary" : "ghost"
                                        }
                                        size="sm"
                                        key={i.toString()}
                                        onClick={() => {
                                          let time = moment(field.value)
                                            .set("minute", i)
                                            .toISOString();

                                          form.setValue("time", time);
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
                                    let time = moment(field.value)
                                      .set(
                                        "hour",
                                        moment(field.value).hour() % 12
                                      )
                                      .toISOString();

                                    form.setValue("time", time);
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
                                    let time = moment(field.value).set(
                                      "hour",
                                      (moment(field.value).hour() % 12) + 12
                                    );

                                    form.setValue("time", time.toISOString());
                                  }}
                                >
                                  PM
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Timezone is optional. If you don’t provide one, we’ll use
                      your local timezone by default to understand times
                      correctly.
                    </FormDescription>
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
                          className="bg-transparent text-white selection:bg-neutral-800"
                          mode="json"
                          theme="github_dark"
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
                    <FormDescription>
                      Please ensure your request includes a valid JSON payload.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    Scheduling Task…
                    <LucideLoader2 className="animate-spin" />
                  </>
                ) : (
                  <>
                    Schedule Task
                    <LucidePlus />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <div className="flex flex-col rounded-lg ">
          <h2 className="mb-2 font-semibold text-xl">Code</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Easily schedule task from our API
          </p>
        </div>

        <hr className="border-b border-border" />

        <div>
          <div className="w-full rounded-md border border-input bg-transparent px-3 py-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <AceEditor
              style={{
                width: "100%",
                height: 200,
              }}
              className="bg-transparent text-white selection:bg-neutral-800"
              mode="sh"
              theme="nord_dark"
              wrapEnabled
              highlightActiveLine={false}
              showGutter={false}
              editorProps={{ $blockScrolling: true }}
              value={`curl -X POST https://api.schedify.dev/v1/scheduleTask \\
    -H "Content-Type: application/json" \\
    -d '${JSON.stringify(
      {
        name: form.watch().name,
        payload: isValidJSON(form.watch().payload)
          ? JSON.parse(form.watch().payload)
          : "",
        time: form.watch().time || "",
        url: form.watch().url || "",
      },
      null,
      2
    )}'`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

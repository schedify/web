"use client";

export const dynamic = "force-static";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { FC, use, useMemo, useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import moment from "moment";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";

const CreateScheduleModal: FC<{
  params: Promise<{
    [key: string]: string;
  }>;
}> = ({ params }) => {
  const { appId } = use(params);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { user, isLoaded } = useUser();

  const [processAt, setProcessAt] = useState<Date>(
    moment().add(1, "d").toDate()
  );

  const [payload, setPayload] = useState(`{\n\t"key": "value"\n}`);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const eventName = formData.get("event") as string;

    const destination = formData.get("destination") as string;

    setLoading(true);
    const resp = await fetch(`/api/apps/${appId}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        event: eventName,
        payload,
        destination,
        scheduledFor: processAt.toISOString(),
      }),
    });

    const res = await resp.json();
    if (!res.status) {
      setLoading(false);
      return toast({
        title: "Oops!",
        description: res.message,
        variant: "destructive",
      });
    }

    toast({
      title: "Success!",
      description: res.message,
    });

    window.location.href = `/apps/${res.appId}/schedules`;
  };

  const webhooks = useMemo(() => {
    if (!isLoaded || !user?.publicMetadata.apps) return [];

    const app = user.publicMetadata.apps.find((app) => app.id === appId);
    if (!app) return [];

    return app.webhooks.map((webhook) => {
      return {
        label: webhook.url,
        value: webhook.id,
      };
    });
  }, [user?.publicMetadata.apps, isLoaded]);

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a schedule</DialogTitle>
          <DialogDescription>
            Set up a custom schedule for your app
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="event">Event</Label>
              <Input
                id="event"
                name="event"
                type="text"
                placeholder="event:name"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoFocus={false}
                maxLength={200}
                required
                disabled={loading}
              />
            </div>

            <div className="gap-2 flex flex-col">
              <Label htmlFor="event">Process at</Label>
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal w-full",
                      !processAt && "text-muted-foreground"
                    )}
                  >
                    {processAt ? (
                      moment(processAt).format("LL, h:mm A")
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
                    selected={processAt}
                    onSelect={(date) => {
                      if (date) return setProcessAt(date);
                      setProcessAt(moment().add(1, "d").toDate());
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
                          const hour = moment(processAt).hour();

                          return (
                            <Button
                              variant={
                                (hour === 12 && i == 11) || hour % 12 === i + 1
                                  ? "secondary"
                                  : "ghost"
                              }
                              size="sm"
                              key={i.toString()}
                              onClick={() => {
                                setProcessAt((prev) => {
                                  return moment(prev)
                                    .set("hour", i + 1)
                                    .toDate();
                                });
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
                          const minute = moment(processAt).minute();

                          return (
                            <Button
                              variant={
                                (minute === 60 && i == 59) || minute % 60 === i
                                  ? "secondary"
                                  : "ghost"
                              }
                              size="sm"
                              key={i.toString()}
                              onClick={() => {
                                setProcessAt((prev) => {
                                  return moment(prev).set("minute", i).toDate();
                                });
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
                          moment(processAt).hour() < 12 ? "secondary" : "ghost"
                        }
                        size="sm"
                        onClick={() => {
                          setProcessAt((prev) => {
                            return moment(prev)
                              .set("hour", moment(prev).hour() % 12)
                              .toDate();
                          });
                        }}
                      >
                        AM
                      </Button>

                      <Button
                        variant={
                          moment(processAt).hour() > 12 ? "secondary" : "ghost"
                        }
                        size="sm"
                        onClick={() => {
                          setProcessAt((prev) => {
                            return moment(prev)
                              .set("hour", (moment(prev).hour() % 12) + 12)
                              .toDate();
                          });
                        }}
                      >
                        PM
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="gap-2 flex flex-col">
              <Label htmlFor="payload">Payload</Label>

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
                  name="payload"
                  onChange={(value) => setPayload(value)}
                  value={payload}
                  showGutter={false}
                  editorProps={{ $blockScrolling: true }}
                />
              </div>
            </div>

            <div className="gap-2 flex flex-col">
              <Label htmlFor="destination">Destination</Label>

              <Select name="destination" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a webhook" />
                </SelectTrigger>
                <SelectContent>
                  {webhooks.map((webhook) => (
                    <SelectItem value={webhook.value} key={webhook.value}>
                      {webhook.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 gap-3 flex justify-end">
            <Button
              type="button"
              onClick={() => router.back()}
              variant="secondary"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  Creating <Loader2 className="animate-spin" />{" "}
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScheduleModal;

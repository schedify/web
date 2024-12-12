"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";

import { useToast, toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const CreateWebhookModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { appId } = useParams();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const destination = formData.get("destination")?.toString() as string;
    if (!destination) {
      return toast({
        title: "Oops!",
        description: "Destination is required",
        variant: "destructive",
      });
    }

    setLoading(true);
    const resp = await fetch(`/api/apps/${appId}/webhooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        destination,
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

    window.location.href = `/apps/${res.appId}/webhooks`;
  };

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Webhook</DialogTitle>
          <DialogDescription>
            Enter the destination url to set up your webhook.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="appName">Destination URL</Label>
              <Input
                id="destination"
                name="destination"
                type="text"
                placeholder="Enter your app's webhook url"
                maxLength={200}
                required
                disabled={loading}
              />
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

export default CreateWebhookModal;

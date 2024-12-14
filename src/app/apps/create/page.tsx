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
import { useState } from "react";
import { Loader2 } from "lucide-react";

const CreateAppModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const appName = formData.get("appName")?.toString() as string;
    if (!appName) {
      return toast({
        title: "Oops!",
        description: "App name is required",
        variant: "destructive",
      });
    }

    setLoading(true);
    const resp = await fetch("/api/apps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: appName,
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
      description: "App created successfully",
    });

    window.location.href = `/apps/${res.appId}`;
  };

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scheduefy your app</DialogTitle>
          <DialogDescription>
            Provide your app's name to set up seamless integrations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="appName">App Name</Label>
              <Input
                id="appName"
                name="appName"
                type="text"
                placeholder="Enter your app's name"
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

export default CreateAppModal;

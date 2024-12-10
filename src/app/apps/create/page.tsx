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
import { useRouter } from "next/navigation";

const CreateAppModal = () => {
  const router = useRouter();
  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scheduefy your app</DialogTitle>
          <DialogDescription>
            Provide your app's name and webhook URL to set up seamless
            integrations.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="appName">App Name</Label>
            <Input
              id="appName"
              type="text"
              placeholder="Enter your app's name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              type="url"
              placeholder="https://your-webhook-url.com"
            />
          </div>
        </div>
        <div className="mt-6 gap-3 flex justify-end">
          <Button onClick={() => router.back()} variant="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppModal;

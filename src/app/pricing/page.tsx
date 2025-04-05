import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  LucideCheck,
  LucideCheckCircle,
  LucideCheckCircle2,
} from "lucide-react";

const FEATURES = {
  Free: [
    { label: "50 events per day", included: true },
    { label: "RESTful APIs", included: true },
    { label: "24–48 hrs ahead scheduling", included: true },
    { label: "256 bytes max payload", included: true },
    { label: "1 API key", included: true },
    { label: "1-day log retention", included: true },
    { label: "Email support", included: true },
    { label: "No retries", included: false },
    { label: "Webhook signature (HMAC-SHA256)", included: false }, // Free
  ],
  Pro: [
    { label: "6,000 events per month", included: true },
    { label: "RESTful APIs", included: true },
    { label: "Up to 30 days ahead scheduling", included: true },
    { label: "1 KB max payload", included: true },
    { label: "1 API key", included: true },
    { label: "7-day log retention", included: true },
    { label: "Priority email support", included: true },
    { label: "Retries (Coming Q2 2025)", included: true },
    { label: "Webhook signature (HMAC-SHA256)", included: true }, // Pro & Buzz
  ],
  Buzz: [
    { label: "20,000 events per month", included: true },
    { label: "RESTful APIs", included: true },
    { label: "Up to 1 year ahead scheduling", included: true },
    { label: "5 KB max payload", included: true },
    { label: "1 API key", included: true },
    { label: "30-day log retention", included: true },
    { label: "Priority support", included: true },
    { label: "Retries (Coming Q2 2025)", included: true },
    { label: "Webhook signature (HMAC-SHA256)", included: true }, // Pro & Buzz
  ],
};

export default function Pricing() {
  return (
    <>
      <div className="container py-28 space-y-10">
        <h1 className="scroll-m-20 text-4xl font-medium font-poppins tracking-tight lg:text-5xl">
          Simple pricing based
          <br />
          on your needs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-center justify-center items-center font-geist-sans">
          <div className="bg-white flex flex-col gap-7 px-5 py-10 p-3 rounded-xl shadow-xl border-t-8 border-black">
            <div className="text-lg font-semibold self-center">Free</div>
            <div className="flex flex-col gap-1 items-center self-center">
              <div className="text-xs text-neutral-600 self-center">
                Test us out for
              </div>
              <div className="font-bold self-center">
                <span className="text-3xl">$0</span>
                <span className="text-sm font-medium">/month</span>
              </div>
              <div className="text-sm self-center">50 events/day included</div>
            </div>

            <Button
              variant="outline"
              className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
              size="lg"
            >
              Try for free
            </Button>

            <div className="flex flex-col gap-2">
              <Label>Features include:</Label>

              {FEATURES.Free.map((v, i) => (
                <div key={String(i)} className="inline-flex items-center gap-1">
                  <LucideCheckCircle2
                    size={20}
                    className={cn(
                      v.included
                        ? "fill-blue-500 stroke-white"
                        : "fill-gray-500 stroke-white",
                    )}
                  />

                  <span className="text-sm">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white flex flex-col gap-7 px-5 py-10 p-3 rounded-xl shadow-xl border-t-8 border-black">
            <div className="text-lg font-semibold self-center">Pro</div>
            <div className="flex flex-col gap-1 items-center self-center">
              <div className="text-xs text-neutral-600 self-center">
                Starting at
              </div>
              <div className="font-bold self-center">
                <span className="text-3xl">$20</span>
                <span className="text-sm font-medium">/month</span>
              </div>
              <div className="text-sm self-center">
                6,000 events/month included
              </div>
            </div>

            <Button
              variant="outline"
              className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
              size="lg"
            >
              Get started
            </Button>

            <div className="flex flex-col gap-2">
              <Label>Features include:</Label>

              {FEATURES.Pro.map((v, i) => (
                <div key={String(i)} className="inline-flex items-center gap-1">
                  <LucideCheckCircle2
                    size={20}
                    className={cn(
                      v.included
                        ? "fill-blue-500 stroke-white"
                        : "fill-gray-500 stroke-white",
                    )}
                  />

                  <span className="text-sm">{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white flex flex-col gap-7 px-5 py-10 p-3 rounded-xl shadow-xl border-t-8 border-black">
            <div className="text-lg font-semibold self-center">Business</div>
            <div className="flex flex-col gap-1 items-center self-center">
              <div className="text-xs text-neutral-600 self-center">
                Starting at
              </div>
              <div className="font-bold self-center">
                <span className="text-3xl">$99</span>
                <span className="text-sm font-medium">/month</span>
              </div>
              <div className="text-sm self-center">
                20,000 events/month included
              </div>
            </div>

            <Button
              variant="outline"
              className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
              size="lg"
            >
              Get started
            </Button>

            <div className="flex flex-col gap-2">
              <Label>Features include:</Label>

              {FEATURES.Buzz.map((v, i) => (
                <div key={String(i)} className="inline-flex items-center gap-1">
                  <LucideCheckCircle2
                    size={20}
                    className={cn(
                      v.included
                        ? "fill-blue-500 stroke-white"
                        : "fill-gray-500 stroke-white",
                    )}
                  />

                  <span className="text-sm">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

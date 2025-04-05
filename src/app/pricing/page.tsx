import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  LucideArrowRight,
  LucideArrowUpRight,
  LucideCheck,
  LucideCheckCircle,
  LucideCheckCircle2,
} from "lucide-react";
import { UpgradeButton } from "./_component/UpgradeButton";
import { getAccessToken } from "../utils/get-apps";

const FEATURES = {
  Free: [
    { label: "10 events per day (hard limit)", included: true },
    { label: "Rate limit: 1 request per 10 seconds", included: true },
    { label: "RESTful APIs", included: true },
    { label: "24–48 hrs ahead scheduling", included: true },
    { label: "50 bytes max payload", included: true },
    { label: "1 API key", included: true },
    { label: "1-day log retention", included: true },
    { label: "Email support", included: true },
    { label: "No retries", included: false },
    { label: "Webhook signature (HMAC-SHA256)", included: false },
  ],
  Starter: [
    { label: "6,000 events per month", included: true },
    { label: "Rate limit: 2 requests per second", included: true },
    { label: "RESTful APIs", included: true },
    { label: "Up to 30 days ahead scheduling", included: true },
    { label: "500 bytes max payload", included: true },
    { label: "1 API key", included: true },
    { label: "7-day log retention", included: true },
    { label: "Priority email support", included: true },
    { label: "Retries (Coming Q2 2025)", included: true },
    { label: "Webhook signature (HMAC-SHA256)", included: true },
  ],
  Growth: [
    { label: "20,000 events per month", included: true },
    { label: "Rate limit: 5 requests per second", included: true },
    { label: "RESTful APIs", included: true },
    { label: "Up to 6 months ahead scheduling", included: true },
    { label: "2 KB max payload", included: true },
    { label: "1 API key", included: true },
    { label: "14-day log retention", included: true },
    { label: "Priority support", included: true },
    { label: "Retries (Coming Q2 2025)", included: true },
    { label: "Webhook signature (HMAC-SHA256)", included: true },
  ],
  Scale: [
    { label: "50,000 events per month", included: true },
    { label: "Rate limit: 10 requests per second", included: true },
    { label: "RESTful APIs", included: true },
    { label: "Up to 1 year ahead scheduling", included: true },
    { label: "5 KB max payload", included: true },
    { label: "1 API key", included: true },
    { label: "30-day log retention", included: true },
    { label: "Priority support", included: true },
    { label: "Retries (Coming Q2 2025)", included: true },
    { label: "Webhook signature (HMAC-SHA256)", included: true },
  ],
};

export default async function Pricing() {
  const user = await currentUser();
  const accessToken = await getAccessToken();

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
              <div className="text-sm self-center">10 events/day included</div>
            </div>

            <ClerkLoading>
              <Button
                variant="outline"
                className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
                size="lg"
              >
                Try for free <LucideArrowRight />
              </Button>
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <Button
                  variant="outline"
                  className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
                  size="lg"
                >
                  Go to webhooks <LucideArrowRight />
                </Button>
              </SignedIn>
              <SignedOut>
                <SignUpButton
                  mode="modal"
                  fallbackRedirectUrl="/webhooks"
                  signInFallbackRedirectUrl="/webhooks"
                  forceRedirectUrl="/webhooks"
                >
                  <Button
                    variant="outline"
                    className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
                    size="lg"
                  >
                    Try for free <LucideArrowRight />
                  </Button>
                </SignUpButton>
              </SignedOut>
            </ClerkLoaded>

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
          <div className="bg-white flex flex-col gap-7 relative px-5 py-10 p-3 rounded-xl shadow-xl border-t-8 border-black">
            <div className="absolute top-[-1rem] left-1/2 -translate-x-1/2 font-geist-sans rounded-lg tracking-wide bg-blue-50 font-bold border-2 border-black px-3">
              POPULAR
            </div>
            <div className="text-lg font-semibold self-center">Starter</div>
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

            {user?.publicMetadata.plan === "STARTER" ? (
              <Button
                variant="outline"
                className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
                size="lg"
                disabled
              >
                Current Plan
              </Button>
            ) : (
              <>
                <ClerkLoading>
                  <Button
                    variant="outline"
                    className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
                    size="lg"
                  >
                    Get started
                  </Button>
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedIn>
                    <UpgradeButton accessToken={accessToken || ""} />
                  </SignedIn>
                  <SignedOut>
                    <SignUpButton
                      mode="modal"
                      fallbackRedirectUrl="/pricing/starter"
                      signInFallbackRedirectUrl="/pricing/starter"
                      forceRedirectUrl="/pricing/starter"
                    >
                      <Button
                        variant="outline"
                        className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
                        size="lg"
                      >
                        Get started
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                </ClerkLoaded>
              </>
            )}

            {/* <Button
              variant="outline"
              className="border-2 self-center border-blue-500 focus-visible:ring-blue-500"
              size="lg"
            >

            </Button> */}

            <div className="flex flex-col gap-2">
              <Label>Features include:</Label>

              {FEATURES.Starter.map((v, i) => (
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
            <div className="text-lg font-semibold self-center">Growth</div>
            <div className="flex flex-col gap-1 items-center self-center">
              <div className="text-xs text-neutral-600 self-center">
                Starting at
              </div>
              <div className="font-bold self-center">
                <span className="text-3xl">$50</span>
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

              {FEATURES.Growth.map((v, i) => (
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
            <div className="text-lg font-semibold self-center">Scale</div>
            <div className="flex flex-col gap-1 items-center self-center">
              <div className="text-xs text-neutral-600 self-center">
                Starting at
              </div>
              <div className="font-bold self-center">
                <span className="text-3xl">$99</span>
                <span className="text-sm font-medium">/month</span>
              </div>
              <div className="text-sm self-center">
                50,000 events/month included
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

              {FEATURES.Scale.map((v, i) => (
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

      <FAQ />
      <Footer />
    </>
  );
}

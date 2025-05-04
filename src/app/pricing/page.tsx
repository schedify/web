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
import Link from "next/link";

const FEATURES = {
  Free: [
    { label: "10,000 events per month", included: true },
    // { label: "Rate limit: 1 request per 10 seconds", included: true },
    { label: "Rate limit: 1 request per 2 seconds", included: true },
    { label: "RESTful APIs", included: true },
    // { label: "24–48 hrs ahead scheduling", included: true },
    { label: "1 year ahead scheduling", included: true },
    { label: "50 bytes max payload", included: true },
    { label: "1 API key", included: true },
    { label: "1-day log retention", included: true },
    { label: "Email support", included: true },
    { label: "Webhook signature (HMAC-SHA256)", included: true },
    { label: "Retries  (Coming Q2 2025)", included: false },
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
              {/* <div className="text-sm self-center">10 events/day included</div> */}
              <div className="text-sm self-center text-center pt-5">
                Schedify is currently free for all users while in beta. No
                payment required.
              </div>
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
                        : "fill-gray-500 stroke-white"
                    )}
                  />

                  <span className="text-sm">{v.label}</span>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="https://discord.gg/DYmy6QYUpr"
                className="self-center"
              >
                <Button
                  variant="outline"
                  className="border-2  border-blue-500 focus-visible:ring-blue-500"
                  size="lg"
                >
                  Request more limit on Discord{" "}
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                  >
                    <title>Discord</title>
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
          {/* <div className="bg-white flex flex-col gap-7 relative px-5 py-10 p-3 rounded-xl shadow-xl border-t-8 border-black">
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
          </div> */}
        </div>
      </div>

      <FAQ />
      <Footer />
    </>
  );
}

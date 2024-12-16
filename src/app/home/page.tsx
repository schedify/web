import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  LucideCable,
  LucideCalendarRange,
  LucideClock,
  LucideCloud,
  LucideLock,
  LucideMail,
  LucideZap,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePageRoute() {
  return (
    <>
      <section className="hero pt-[20vh] flex flex-col items-center">
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-[500] text-center tracking-tight text-gray-900  font-poppins lg:pb-2">
          <span className="animate-fade">Automate</span>{" "}
          <span className="animate-fade animate-delay-300">Your System.</span>
        </h1>

        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-[500] text-center tracking-tight text-gray-900 mb-6 font-poppins">
          <span className="text-blue-600 font-bold animate-fade animate-delay-[600ms]">
            Schedule
          </span>{" "}
          <span className="animate-fade animate-delay-[900ms]">
            Them with Ease.
          </span>
        </h1>

        <p className="text-xs w-11/12 animate-fade-up animate-delay-[1200ms] md:w-full md:text-base font-karla text-center text-gray-600 mb-8">
          Effortlessly schedule and send webhooks at the perfect time—secure,
          reliable, and automated.
        </p>

        <Suspense fallback={<div></div>}>
          <JoinNowButton />
        </Suspense>
      </section>

      <section className="container pt-[15vh] grid grid-cols-1 sm:grid-cols-2  gap-8">
        <div className="flex flex-col items-center justify-center border md:border-2 border-dashed border-neutral-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out relative bg-secondary">
          <div className="mb-6 text-center">
            <h3 className="text-lg md:text-2xl font-semibold text-primary mb-3 inline-flex items-center gap-2 md:gap-3">
              <LucideClock className="size-5 md:size-6" />
              <span>Scheduled Webhooks</span>
            </h3>
            <p className="text-gray-700 text-xs md:text-sm">
              Schedule webhooks to be sent at specific times to automate your
              processes and improve efficiency.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border md:border-2 border-dashed border-neutral-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out relative bg-secondary">
          <div className="mb-6 text-center">
            <h3 className="text-lg md:text-2xl font-semibold text-primary mb-3 inline-flex items-center gap-2 md:gap-3">
              <LucideLock className="size-5 md:size-6" />
              <span>Secure Authentication</span>
            </h3>
            <p className="text-gray-700 text-xs md:text-sm">
              We rely on Clerk for robust authentication, ensuring your account
              and data are secure at all times.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border md:border-2 border-dashed border-neutral-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out relative bg-secondary">
          <div className="mb-6 text-center">
            <h3 className="text-lg md:text-2xl font-semibold text-primary mb-3 inline-flex items-center gap-2 md:gap-3">
              <LucideCable className="size-5 md:size-6" />
              <span>Flexible Integration</span>
            </h3>
            <p className="text-gray-700 text-xs md:text-sm">
              Seamlessly integrate with your system using our API and easily
              manage scheduled requests.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border md:border-2 border-dashed border-neutral-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out relative bg-secondary">
          <div className="mb-6 text-center">
            <h3 className="text-lg md:text-2xl font-semibold text-primary mb-3 inline-flex items-center gap-2 md:gap-3">
              <LucideCloud className="size-5 md:size-6" />
              <span>Cloud-Based Reliability</span>
            </h3>
            <p className="text-gray-700 text-xs md:text-sm">
              Our platform is cloud-based, ensuring scalability, reliability,
              and uptime, so you never miss a webhook.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-[20vh]">
        <div className="bg-indigo-900 min-h-[200px] md:min-h-[300px] rounded-xl flex flex-col items-center justify-center shadow-2xl shadow-blue-500/50 space-y-5">
          <h1 className="text-white font-bold font-poppins text-2xl md:text-5xl">
            Need help? Contact us
          </h1>

          <a
            href="mailto:support@schedify.dev"
            className="inline-flex items-center gap-1 text-white"
          >
            <LucideMail size={16} className="" />
            <span className="underline font-karla underline-offset-8 text-sm md:text-base">
              support@schedify.dev
            </span>
          </a>
        </div>
      </section>
      <footer className="bg-primary min-h-[400px] relative flex py-10 overflow-hidden">
        <span
          className={cn(
            "absolute -bottom-20 left-0 right-0 font-bold select-none font-poppins text-center",
            "text-center text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary dark:from-neutral-950 to-background dark:to-neutral-800 inset-x-0"
          )}
        >
          Schedify
        </span>

        <div className="container h-full">
          <div className="text-background flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <LucideCalendarRange size={18} />
              <h1 className="font-bold font-geist-mono text-lg">Schedify</h1>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-gray-300 font-geist-sans">Legal</h1>

              <div className="text-sm flex flex-col font-geist-sans gap-1">
                <Link
                  className="hover:underline underline-offset-2 "
                  href="/legal/terms"
                >
                  Terms of Service
                </Link>
                <Link
                  className="hover:underline underline-offset-2 "
                  href="/legal/privacy"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <span className="text-white mt-auto text-sm font-medium font-geist-mono">
            Crafted with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://github.com/ksamirdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
            >
              Samir
            </a>
            !
          </span>
        </div>
      </footer>
    </>
  );
}

const JoinNowButton = async () => {
  const user = await currentUser();

  return user ? (
    <Link href="/">
      <EnhancedButton
        size="lg"
        className="rounded-full font-semibold hover:bg-blue-500 animate-fade-up animate-delay-[1000ms]"
        variant="expandIcon"
        Icon={LucideZap}
        iconPlacement="right"
      >
        Join now!
      </EnhancedButton>
    </Link>
  ) : (
    <>
      <ClerkLoading>
        <EnhancedButton
          size="lg"
          className="rounded-full font-semibold hover:bg-blue-500 animate-fade-up animate-delay-[1000ms]"
          variant="expandIcon"
          Icon={LucideZap}
          iconPlacement="right"
        >
          Join now!
        </EnhancedButton>
      </ClerkLoading>
      <ClerkLoaded>
        <SignInButton mode="modal" fallbackRedirectUrl="/" forceRedirectUrl="/">
          <EnhancedButton
            size="lg"
            className="rounded-full font-semibold hover:bg-blue-500 animate-fade-up animate-delay-[1000ms]"
            variant="expandIcon"
            Icon={LucideZap}
            iconPlacement="right"
          >
            Join now!
          </EnhancedButton>
        </SignInButton>
      </ClerkLoaded>
    </>
  );
};

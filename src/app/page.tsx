import { CodeBlock } from "@/components/code-block";
import { Footer } from "@/components/landing/Footer";
import AnimatedSchedifyComponent from "@/components/landing/ServerAnimation";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { ClerkLoaded, ClerkLoading, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  LucideArrowUpRight,
  LucideBookOpen,
  LucideCable,
  LucideChevronRight,
  LucideClock,
  LucideCode,
  LucideLandmark,
  LucideLock,
  LucideRotateCcw,
  LucideWebhook,
  LucideZap,
} from "lucide-react";
import Link from "next/link";
import { memo, Suspense } from "react";
// import { LandingCodeBlock } from "./client-code-block";
import { highlightCode } from "@/lib/utils";

const AnimatedSchedifyComponentMemo = memo(AnimatedSchedifyComponent);

export default async function HomePageRoute() {
  return (
    <div className="container px-0 border">
      <section className="hero py-[10vh] flex flex-col items-center gap-5 relative  mx-4 md:mx-10">
        <h1 className="text-center text-2xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-200 leading-tight relative">
          <span className="text-xl sm:text-5xl md:text-6xl">
            Scheduling Tasks
          </span>
          <br />
          <span className="text-blue-500">Shouldn't Be Hard!</span>
          {/* <span className="text-blue-500">Stop</span> writing schedulers
          <br />
          from <i className="italic text-white">scratch!</i> */}
        </h1>

        <p className="mt-3 mb-5 text-center text-sm sm:text-lg text-gray-400 font-medium mx-auto">
          No auth required. No infrastructure to manage. Just simple, reliable
          task scheduling for developers.
        </p>

        <div className="flex flex-col-reverse gap-4 md:flex-row items-center">
          <Link href="/5-min-guide">
            <EnhancedButton variant="linkHover2" size="lg">
              Read our Simple Integration Guide
            </EnhancedButton>
          </Link>

          <Link href="/schedules">
            <EnhancedButton
              className="font-semibold "
              variant="expandIcon"
              Icon={LucideChevronRight}
              iconPlacement="right"
            >
              Start Scheduling - It's free
            </EnhancedButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:gap-y-10 md:gap-x-0 md:grid-cols-3 place-items-center relative place-content-center w-full border-y py-5 mt-10 ">
          <div className="size-[10px] bg-background border border-border rounded-[2px] absolute top-[-5px] left-0"></div>
          <div className="size-[10px] bg-background border border-border rounded-[2px] absolute top-[-5px] right-0"></div>
          <div className="size-[10px] bg-background border border-border rounded-[2px] absolute bottom-[-5px] left-0"></div>
          <div className="size-[10px] bg-background border border-border rounded-[2px] absolute bottom-[-5px] right-0"></div>

          {[
            {
              icon: <LucideClock className="size-5 stroke-2 stroke-blue-100" />,
              title: "No Login Needed",
              text: "Start scheduling instantly. No API keys or sign-ups required.",
            },
            {
              icon: <LucideCable className="size-5 stroke-2 stroke-blue-100" />,
              title: "Timezone Aware",
              text: 'Use natural language like "tomorrow 9am EST" to schedule tasks anywhere.',
            },
            {
              icon: <LucideLock className="size-5 stroke-2 stroke-blue-100" />,
              title: "Secure",
              text: "HMAC signing ensures your notifications are safe and verified.",
            },
            {
              icon: <LucideZap className="size-5 stroke-2 stroke-blue-100" />,
              title: "Instant Scheduling",
              text: "Tasks are created and scheduled with zero delay or queues.",
            },
            {
              icon: <LucideCode className="size-5 stroke-2 stroke-blue-100" />,
              title: "JSON Native",
              text: "Send and receive JSON. Perfect for modern APIs and microservices.",
            },
            {
              icon: (
                <LucideRotateCcw className="size-5 stroke-2 stroke-blue-100" />
              ),
              title: "Auto Retries",
              text: "Failed tasks are retried automatically with exponential backoff.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-5 text-center pl-4"
            >
              <div className="bg-blue-800 py-1.5 px-5 rounded-xl border-2 border-blue-950">
                {item.icon}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="text-neutral-200 text-sm mt-2">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10" />

        <AnimatedSchedifyComponentMemo />
      </section>

      <section className="flex flex-col border-t py-5 relative">
        <h2 className="bg-primary p-2 text-black self-center absolute -top-5 text-xl font-quicksand text-center font-bold">
          Schedule a task in one request & No Auth Required!
        </h2>

        <div className="mr-[14px] flex overflow-hidden bg-transparent text-white w-full">
          <div className="flex min-w-0 flex-1 flex-col relative">
            <div
              data-rehype-pretty-code-fragment
              // dangerouslySetInnerHTML={{ __html: file?.highlightedContent ?? "" }}
              className="relative flex-1 overflow-hidden after:absolute after:inset-y-0 after:left-0 after:w-10 after:bg-transparent [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:pb-5 [&_pre]:pt-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: await highlightCode(
                  "sh",
                  `curl -X POST https://api.schedify.dev/v1/schedules \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "send:email",
    "url": "https://api.your-app.com/send-emails",
    "time": "2024-01-20T15:00:00Z",
    "payload": {
      "campaign": "welcome"
      "email": "samir@schedify.dev"
    }
  }'`
                ),
              }}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l">
          <div className="flex flex-col p-3 md:p-6 border-b border-r">
            <h3 className="text-xl font-semibold mb-2">Task Schedule</h3>
            <p className="text-gray-300 pb-5 text-sm">
              Cancel unpaid orders <strong>30 minutes after creation</strong>
            </p>
            <CodeBlock lang="typescript">
              {`// At 2:00PM order is placed
schedify.schedule({
  event: "cancel_order",
  payload: { orderId: "ord_123" },
  after: "30m" // ← Will run at 2:30PM
});`}
            </CodeBlock>
          </div>

          <div className="flex flex-col p-3 md:p-6 border-b border-r">
            <div className="inline-flex items-start justify-between">
              <h3 className="text-xl font-semibold mb-2">Multiple Timezones</h3>
            </div>

            <p className="text-gray-300 pb-5 text-sm">
              Send alerts <strong>at 9:00AM in user's timezone</strong>
            </p>
            <CodeBlock lang="typescript">
              {`// For user in PST (UTC-8)
schedify.schedule({
  event: "morning_alert",
  userId: "u_456",
  at: "2023-12-01T09:00:00-08:00" // ← 9AM PST
});`}
            </CodeBlock>
          </div>

          <div className="flex flex-col p-3 md:p-6 border-b border-r">
            <div className="inline-flex items-start justify-between">
              <h3 className="text-xl font-semibold mb-2">Cron Schedule</h3>
              <div className=" bg-white text-sm text-black font-geist-mono p-2 font-bold">
                Coming soon
              </div>
            </div>

            <p className="text-gray-300 pb-5 text-sm">
              Generate reports <strong>every day at 11:59PM</strong>
            </p>
            <CodeBlock lang="typescript">
              {`// Runs nightly at midnight
schedify.schedule({
  event: "generate_report",
  reportType: "daily",
  at: "0 23 * * *" // ← Cron syntax
});`}
            </CodeBlock>
          </div>

          <div className="flex flex-col p-3 md:p-6 border-b border-r">
            <div className="inline-flex items-start justify-between">
              <h3 className="text-xl font-semibold mb-2">Batch Schedules</h3>
              <div className="bg-white text-sm text-black font-geist-mono p-2 font-bold">
                Coming soon
              </div>
            </div>

            <p className="text-gray-300 pb-5 text-sm">
              Send emails <strong>immediately, 1 day, and 7 days</strong> after
              signup
            </p>
            <CodeBlock lang="typescript">
              {`// User signs up at 4:00PM Jan 1
schedify.scheduleMany([
  { event: "welcome_email", after: "0m" },  // 4:00PM Jan 1
  { event: "tips_email", after: "1d" },     // 4:00PM Jan 2
  { event: "offer_email", after: "7d" }     // 4:00PM Jan 8
]);`}
            </CodeBlock>
          </div>
        </div>
      </section>

      <section className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-5 border-b ">
          <div className="col-span-2 flex flex-col divide-y border-r">
            <Link
              href="https://docs.schedify.dev/docs/introduction"
              passHref
              target="_blank"
            >
              <div className="hover:bg-[#0C0C0C] space-y-5 duration-50 group transition-colors cursor-pointer p-3">
                <div className="flex font-semibold flex-row col-span-2 gap-3 items-center">
                  <LucideBookOpen />
                  Documentation
                  <LucideArrowUpRight className="ml-auto self-end group-hover:translate-x-1 group-hover:-translate-y-1 duration-100 transition-shadow" />
                </div>

                <p>Read our guides and documentation</p>
              </div>
            </Link>

            <Link
              href="https://docs.schedify.dev/docs/schedify-api/overview"
              passHref
              target="_blank"
            >
              <div className="hover:bg-[#0C0C0C] group space-y-5 duration-50 transition-colors cursor-pointer p-3">
                <div className="flex font-semibold flex-row col-span-2 gap-3 items-center">
                  <LucideLandmark />
                  API Reference
                  <LucideArrowUpRight className="ml-auto self-end group-hover:translate-x-1 group-hover:-translate-y-1 duration-100 " />
                </div>

                <p>Refer to our API endpoints and schemas</p>
              </div>
            </Link>

            <Link
              href="https://github.com/standard-webhooks/standard-webhooks"
              passHref
              target="_blank"
            >
              <div className="hover:bg-[#0C0C0C] group space-y-5 duration-50 transition-colors cursor-pointer p-3">
                <div className="flex font-semibold flex-row col-span-2 gap-3 items-center">
                  <LucideWebhook />
                  Standard Webhooks Compliant
                  <LucideArrowUpRight className="ml-auto self-end group-hover:translate-x-1 group-hover:-translate-y-1 duration-100 " />
                </div>

                <p>Read the Standard Webhooks spec</p>
              </div>
            </Link>
          </div>

          <div className="col-span-3 space-y-4 flex flex-col p-5">
            <div>
              <CodeBlock lang="typescript">
                {`const schedify = new SchedifyClient("API_KEY");

await schedify.schedule("WEBHOOK_ID", {
  event: "cancel_order",
  payload: { orderId: "ord_123" },
  after: "30m" // ← Will run at 2:30PM
});`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[10vh] flex justify-center bg-[#0C0C0C]">
        <div className="w-full text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            Launch scheduled tasks in seconds
          </h2>
          <p className="text-white/80 text-base">
            Skip the cron jobs, queues, and infrastructure. Use our API to run
            anything later—with guaranteed delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedules">
              <EnhancedButton
                size="lg"
                className="rounded-none font-semibold bg-blue-500 hover:bg-blue-600 text-white"
                variant="expandIcon"
                Icon={LucideChevronRight}
                iconPlacement="right"
              >
                Start Scheduling — Its free
              </EnhancedButton>
            </Link>
            <Link href="/5-min-guide">
              <EnhancedButton
                className="text-white"
                size="lg"
                variant="linkHover2"
              >
                Read the 5‑Minute Guide
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* <FAQ /> */}
      <Footer />
    </div>
  );
}

const JoinNowButton = async () => {
  const user = await currentUser();

  return user ? (
    <Link href="/webhooks">
      <EnhancedButton
        className="font-semibold"
        variant="expandIcon"
        Icon={LucideChevronRight}
        iconPlacement="right"
      >
        Take me to webhooks!
      </EnhancedButton>
    </Link>
  ) : (
    <>
      <ClerkLoading>
        <EnhancedButton
          size="lg"
          className="font-semibold"
          variant="expandIcon"
          Icon={LucideChevronRight}
          iconPlacement="right"
        >
          Start Scheduling - It's free
        </EnhancedButton>
      </ClerkLoading>
      <ClerkLoaded>
        <SignUpButton
          mode="modal"
          fallbackRedirectUrl="/webhooks"
          signInFallbackRedirectUrl="/webhooks"
          forceRedirectUrl="/webhooks"
        >
          <EnhancedButton
            size="lg"
            className="font-semibold"
            variant="expandIcon"
            Icon={LucideChevronRight}
            iconPlacement="right"
          >
            Start Scheduling - It's free
          </EnhancedButton>
        </SignUpButton>
      </ClerkLoaded>
    </>
  );
};

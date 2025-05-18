import { CodeBlock } from "@/components/code-block";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import AnimatedSchedifyComponent from "@/components/landing/ServerAnimation";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { ClerkLoaded, ClerkLoading, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  LucideArrowUpRight,
  LucideBookOpen,
  LucideCable,
  LucideChevronRight,
  LucideClock,
  LucideLandmark,
  LucideLock,
  LucideZap,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePageRoute() {
  return (
    <>
      <section className="hero py-[15vh] pt-[20vh] flex flex-col items-center gap-5 relative container">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center tracking-tight text-gray-900 font-poppins">
          <span className="text-blue-600">Developer-First</span> Task Scheduling
        </h1>
        <p className="text-sm md:text-base font-medium text-center text-gray-600 mb-6">
          API-first scheduling for developers. Set up timed tasks, delays, and
          reminders—without managing servers or cron jobs
        </p>
        <div className="flex flex-row items-center">
          <Link href="/5-min-guide">
            <Button variant="link" size="lg">
              5-Min Guide <LucideChevronRight />
            </Button>
          </Link>

          <Suspense
            fallback={
              <>
                <EnhancedButton
                  className="rounded-full font-semibold hover:bg-blue-500"
                  variant="expandIcon"
                  Icon={LucideZap}
                  iconPlacement="right"
                >
                  Start Scheduling - Free Forever
                </EnhancedButton>
              </>
            }
          >
            <JoinNowButton />
          </Suspense>
        </div>
        <div className="mt-10" />
        <AnimatedSchedifyComponent />

        {/* <Image
          src="/landing.png"
          height={300}
          width={900}
          className="mt-20 rounded-2xl shadow-2xl ring-4 ring-offset-4 ring-black"
          alt=""
          quality={100}
          loading="eager"
        /> */}
      </section>
      {/* <LandingAnimation /> */}

      <section className="container">
        <h2 className="my-10 text-5xl font-geist-mono text-center font-bold tracking-tight transition-colors first:mt-0 pb-10">
          Why Developers Love Schedify
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
          {[
            {
              icon: <LucideClock className="size-6 stroke-black" />,
              title: "Task Scheduling",
              text: "Offload timed tasks with atomic reliability",
            },
            {
              icon: <LucideCable className="size-6 stroke-black" />,
              title: "Easy Integration",
              text: "Connect seamlessly with our APIs & SDKs",
            },
            {
              icon: <LucideLock className="size-6 stroke-black" />,
              title: "Secure",
              text: "HMAC-signed payloads for peace of mind",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-5 text-center"
            >
              <div className="bg-blue-50 p-3 rounded-full">{item.icon}</div>

              <div>
                <h3 className="text-xl font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm mt-2">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mt-32">
        <h2 className="my-10 text-5xl font-geist-mono text-center font-bold tracking-tight transition-colors first:mt-0 pb-10">
          Example use cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {/* Use Case 1 */}
          <div className="flex flex-col p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">1. Abandoned Orders</h3>
            <p className="text-gray-600 pb-5 text-sm">
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

          {/* Use Case 2 */}
          <div className="flex flex-col p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              2. End-of-Day Reports
            </h3>
            <p className="text-gray-600 pb-5 text-sm">
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
            <i className="mt-3 text-sm text-gray-600">
              Note: Cron-based scheduling is not live yet!
            </i>
          </div>

          {/* Use Case 3 */}
          <div className="flex flex-col p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              3. Welcome Email Series
            </h3>
            <p className="text-gray-600 pb-5 text-sm">
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
            <i className="mt-3 text-sm text-gray-600">
              Note: Sequence scheduling is not live yet!
            </i>
          </div>

          {/* Use Case 4 */}
          <div className="flex flex-col p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              4. Morning Notifications
            </h3>
            <p className="text-gray-600 pb-5 text-sm">
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
            <i className="mt-3 text-sm text-gray-600">
              Note: User-based timezone scheduling is not live yet! We convert
              all time to UTC
            </i>
          </div>
        </div>
      </section>

      <section className="mt-40 bg-blue-50">
        <div className="container py-10">
          <h2 className="my-10 text-5xl font-geist-mono font-bold tracking-tight transition-colors first:mt-0">
            Designed for developers
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="col-span-2 flex flex-col gap-y-5">
              <Link
                href="https://docs.schedify.dev/docs/introduction"
                passHref
                target="_blank"
              >
                <div className="bg-blue-100 border space-y-5 border-blue-200 hover:bg-blue-200 duration-50 transition-colors cursor-pointer rounded-lg p-3">
                  <div className="flex font-semibold flex-row col-span-2 gap-3 items-center">
                    <LucideBookOpen />
                    Documentation
                    <LucideArrowUpRight className="ml-auto self-end" />
                  </div>

                  <p>Read our guides and documentation</p>
                </div>
              </Link>

              <Link
                href="https://docs.schedify.dev/docs/schedify-api/overview"
                passHref
                target="_blank"
              >
                <div className="bg-blue-100 border space-y-5 border-blue-200 hover:bg-blue-200 duration-50 transition-colors cursor-pointer rounded-lg p-3">
                  <div className="flex font-semibold flex-row col-span-2 gap-3 items-center">
                    <LucideLandmark />
                    API Reference
                    <LucideArrowUpRight className="ml-auto self-end" />
                  </div>

                  <p>Refer to our API endpoints and schemas</p>
                </div>
              </Link>

              {/* <Link
                href="https://github.com/standard-webhooks/standard-webhooks"
                passHref
                target="_blank"
              >
                <div className="bg-blue-100 border space-y-5 border-blue-200 hover:bg-blue-200 duration-50 transition-colors cursor-pointer rounded-lg p-3">
                  <div className="flex font-semibold flex-row col-span-2 gap-3 items-center">
                    <LucideWebhook />
                    Standard Webhooks Compliant
                    <LucideArrowUpRight className="ml-auto self-end" />
                  </div>

                  <p>Read the Standard Webhooks spec</p>
                </div>
              </Link> */}
            </div>

            <div className="col-span-3 space-y-4 flex flex-col">
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

              {/* <div className="inline-flex items-center gap-5 justify-center">
                <div className="size-5 ring-4 ring-offset-4 rounded cursor-pointer">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>JavaScript</title>
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                  </svg>
                </div>

                <div className="size-5 rounded cursor-pointer">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Go</title>
                    <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 01.292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 01-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2m3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 01-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.63.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788.935-2.045 2.033-.21.912.234 1.835 1.075 2.21.643.28 1.285.244 1.905-.07.923-.48 1.425-1.228 1.484-2.233z" />
                  </svg>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="container pt-[10vh] flex justify-center">
        <div className="bg-indigo-900 w-full max-w-3xl min-h-[250px] md:min-h-[350px] rounded-xl flex flex-col items-center justify-center shadow-lg shadow-blue-500/50 px-6 py-8 text-center space-y-6">
          <h1 className="text-white font-bold font-poppins text-3xl md:text-5xl">
            Help Us Improve
          </h1>

          <p className="text-white text-sm md:text-base font-karla opacity-90">
            Have a feature request? Share your ideas and help shape the future
            of Schedify.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link
              href="https://discord.gg/DYmy6QYUpr"
              className="inline-flex items-center gap-2 bg-white text-indigo-900 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
              >
                <title>Discord</title>
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              Join Discord
            </Link>

            <a
              href="https://insigh.to/b/schedify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white border border-white px-5 py-2 rounded-lg shadow-md hover:bg-white hover:text-indigo-900 transition"
            >
              🚀 Submit Feature Request
            </a>
          </div>
        </div>
      </section> */}

      <section className="container py-[10vh] flex justify-center">
        <div className="bg-indigo-950 w-full max-w-4xl rounded-2xl px-8 py-12 text-center text-white shadow-lg space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            Ready to fast-track your backend?
          </h2>
          <p className="text-white/80 text-md md:text-lg">
            Get started in minutes with zero infrastructure. No cron, no stress
            — just reliable task scheduling, built for developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/webhooks">
              <EnhancedButton
                size="lg"
                className="rounded-full font-semibold bg-blue-500 hover:bg-blue-600 text-white"
                variant="expandIcon"
                Icon={LucideZap}
                iconPlacement="right"
              >
                Start Scheduling – Free Forever
              </EnhancedButton>
            </Link>
            <Link href="/5-min-guide">
              <Button className="text-white" size="lg" variant="link">
                Read the 5-Min Guide <LucideChevronRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <FAQ /> */}
      <Footer />
    </>
  );
}

const JoinNowButton = async () => {
  const user = await currentUser();

  return user ? (
    <Link href="/webhooks">
      <EnhancedButton
        className="rounded-full font-semibold hover:bg-blue-500"
        variant="expandIcon"
        Icon={LucideZap}
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
          className="rounded-full font-semibold hover:bg-blue-500"
          variant="expandIcon"
          Icon={LucideZap}
          iconPlacement="right"
        >
          Start Scheduling - Free Forever
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
            className="rounded-full font-semibold hover:bg-blue-500"
            variant="expandIcon"
            Icon={LucideZap}
            iconPlacement="right"
          >
            Start Scheduling - Free Forever
          </EnhancedButton>
        </SignUpButton>
      </ClerkLoaded>
    </>
  );
};

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { ClerkLoaded, SignUpButton } from "@clerk/nextjs";
import { LucideZap } from "lucide-react";
import Link from "next/link";

export default function FiveMinGuide() {
  return (
    <div className="container py-28">
      <h1 className="scroll-m-20 text-4xl font-bold font-poppins tracking-tight lg:text-5xl">
        ⚡ 5-Min Integration Guide
      </h1>

      <ol className="space-y-12 text-lg mt-12">
        {/* Step 1 */}
        <li>
          <h2 className="text-2xl font-semibold mb-2">1. Create an account</h2>
          <p>
            Start by signing up. It's free, fast, and gets you API keys +
            dashboard access.
          </p>

          <ClerkLoaded>
            <SignUpButton
              mode="modal"
              fallbackRedirectUrl="/webhooks"
              signInFallbackRedirectUrl="/webhooks"
              forceRedirectUrl="/webhooks"
            >
              <EnhancedButton
                size="lg"
                className="rounded-full font-semibold hover:bg-blue-500 mt-5"
                variant="expandIcon"
                Icon={LucideZap}
                iconPlacement="right"
              >
                Join now!
              </EnhancedButton>
            </SignUpButton>
          </ClerkLoaded>
        </li>

        {/* Step 2 */}
        <li>
          <h2 className="text-2xl font-semibold mb-2">
            2. Register your webhook
          </h2>
          <p className="mb-2">
            Head over to the{" "}
            <Link
              href="/webhooks"
              className="text-blue-600 underline font-medium"
            >
              Webhooks section
            </Link>{" "}
            in your dashboard and click “Setup Webhook”.
          </p>
          <ul className="list-disc list-inside pl-4 mb-4 text-base">
            <li>
              <strong>Name:</strong> Anything you like (e.g., "My Server")
            </li>
            <li>
              <strong>URL:</strong>{" "}
              <code className="bg-gray-200 px-1 rounded">
                https://yourdomain.com/webhook
              </code>
            </li>
          </ul>
          <p>
            Need more details? Check out the{" "}
            <a
              href="https://docs.schedify.dev/docs/schedify-webhook/overview"
              className="text-blue-600 underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              webhook docs
            </a>
            .
          </p>
        </li>

        {/* Step 3 */}
        <li>
          <h2 className="text-2xl font-semibold mb-2">
            3. Schedule your first task
          </h2>
          <p className="mb-2">Trigger notifications at specific times via:</p>
          <ul className="list-disc list-inside pl-4 text-base space-y-1">
            <li>
              <Link
                href="/webhooks"
                className="text-blue-600 underline"
                target="_blank"
              >
                📅 Dashboard UI
              </Link>
            </li>
            <li>
              <Link
                href="https://docs.schedify.dev/docs/schedify-api/overview"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                🧪 REST API
              </Link>
            </li>
            <li>
              <Link
                href="https://docs.schedify.dev/docs/schedify-api/overview"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                📦 SDK (Node, Python, etc.)
              </Link>
            </li>
          </ul>
        </li>

        {/* Step 4 */}
        <li>
          <h2 className="text-2xl font-semibold mb-2">
            4. Handle incoming events
          </h2>
          <p className="mb-4">
            When it’s time, we’ll send a signed HTTP POST to your webhook like
            this:
          </p>

          <pre className="bg-gray-100 rounded-md p-4 text-sm overflow-x-auto">
            <CodeBlock lang="bash">
              {`POST /webhook HTTP/2
Content-Type: application/json
X-Schedify-Signature: sha256=...

{
  "event": "task.triggered",
  "payload": {
    "customData": "your data here"
  }
}`}
            </CodeBlock>
          </pre>

          <p className="mt-4">
            🛡️ <strong>Pro tip:</strong> Always verify the{" "}
            <code className="bg-gray-200 px-1 rounded">
              X-Schedify-Signature
            </code>{" "}
            using your webhook secret to ensure authenticity.
          </p>

          <p className="mt-4">
            Want full code samples? Check out the{" "}
            <a
              href="https://github.com/schedify/webhook-examples"
              className="text-blue-600 underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              webhook examples repo
            </a>
            .
          </p>
        </li>
      </ol>
    </div>
  );
}

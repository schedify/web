import Link from "next/link";
import { LucideChevronRight, LucideZap } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { ClerkLoaded, SignUpButton } from "@clerk/nextjs";

export default function FiveMinGuide() {
  return (
    <div className="container px-0 border">
      <section className="py-[15vh] pt-[10vh] space-y-10">
        <h1 className="scroll-m-20 text-4xl font-bold  lg:text-5xl text-center">
          Simple Integration Guide
        </h1>

        <div className="grid grid-cols-6">
          <div />
          <div className="col-span-4 grid grid-cols-2 border-2 border-[#282828] bg-[#191919]">
            <button className="py-3 bg-[#FAFAFA] text-[#191919]  font-bold text-lg">
              No Auth guide
            </button>

            <button className="py-3 font-bold text-lg inline-flex items-center justify-center gap-5">
              Auth Guide
              <div className="bg-white text-sm font-bold text-background px-3 py-1 rounded-full">
                COMING SOON
              </div>
            </button>
          </div>
          <div />
        </div>

        <div className="grid gap-5 divide-y border-y">
          <div className="space-y-4 p-5 flex flex-col">
            <div className="size-[30px] rounded-full text-center text-black bg-white text-lg font-bold">
              1
            </div>
            <div className="text-xl font-bold">Schedule It.</div>

            <Link href="/schedules" className="w-full">
              <EnhancedButton
                variant="expandIcon"
                Icon={LucideChevronRight}
                iconPlacement="right"
              >
                Click here to schedule through UI
              </EnhancedButton>
            </Link>

            <div className="inline-flex items-center">
              <div className="bg-border h-px flex-1" />
              <div className="text-sm">OR</div>
              <div className="bg-border h-px flex-1" />
            </div>

            <p className="text-muted-foreground">
              Use the following <code>curl</code> command to schedule a task
              with Schedify. Be sure to replace the values with your actual
              data.
            </p>

            <CodeBlock lang="bash">
              {`curl -X POST https://api.schedify.dev/v1/schedule \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "SendWelcomeEmail",
    "payload": {
      "user_id": "12345",
      "email": "user@example.com"
    },
    "time": "2025-05-21T15:00:00Z",
    "url": "https://yourdomain.com/webhooks/welcome"
  }'`}
            </CodeBlock>

            <p className="text-muted-foreground">
              This request will create a scheduled event that posts the payload
              to your webhook at the specified time.
            </p>

            <p className="text-muted-foreground">
              You'll receive a response like this:
            </p>

            <CodeBlock lang="json">
              {`{
  "status":1,
  "message":"Webhook event created successfully!",
  "data": {
    "eventId": "evt_abc123xyz",
    "webhookId": "b2953cf3-e9b4-4482-a74a-220288df32f0",
    "webhookSecret": "whsec_supersecretkey"
  }
}`}
            </CodeBlock>
          </div>

          <div className="space-y-4 p-5">
            <div className="size-[30px] rounded-full text-center text-black bg-white text-lg font-bold">
              2
            </div>
            <div className="text-xl font-bold">Handle It.</div>

            <p className="text-muted-foreground">
              When your scheduled event triggers, Schedify sends a{" "}
              <strong>POST</strong> request to your webhook URL, along with
              headers that allow you to verify the request's authenticity.
            </p>

            <p className="text-muted-foreground">
              The payload will be the same as what you originally passed when
              scheduling the event.
            </p>

            <p className="text-muted-foreground font-semibold">
              📦 Headers Included:
            </p>

            <CodeBlock lang="http">
              {`X-Webhook-Signature: <HMAC signature>
X-Webhook-Timestamp: <Unix timestamp>
X-Webhook-ID: <Webhook ID>`}
            </CodeBlock>

            <p className="text-muted-foreground">
              Use these headers and the request body to validate the signature.
              The signature is a base64-encoded HMAC-SHA256 hash, generated
              using your <code>webhookSecret</code>.
            </p>

            <p className="text-muted-foreground font-semibold">
              🔐 Signature Generation Logic (Go):
            </p>

            <CodeBlock lang="go">
              {`func generateSignature(secret string, webhookID string, payload []byte) (string, int64, error) {
    timestamp := time.Now().UTC().Unix()

    // webhook_id.timestamp.payload
    signingPayload := fmt.Sprintf("%s.%d.%s", webhookID, timestamp, string(payload))

    h := hmac.New(sha256.New, []byte(secret))
    if _, err := h.Write([]byte(signingPayload)); err != nil {
        return "", timestamp, fmt.Errorf("failed to create HMAC: %w", err)
    }

    signature := base64.RawURLEncoding.EncodeToString(h.Sum(nil))
    return signature, timestamp, nil
}`}
            </CodeBlock>

            <p className="text-muted-foreground">To verify the signature:</p>

            <ol className="list-decimal list-inside text-muted-foreground space-y-1 pl-5">
              <li>
                Extract the values of <code>X-Webhook-ID</code> and{" "}
                <code>X-Webhook-Timestamp</code> from the headers.
              </li>
              <li>
                Read the raw request body (the payload you sent when
                scheduling).
              </li>
              <li>
                Reconstruct the string as{" "}
                <code>webhook_id.timestamp.payload</code>.
              </li>
              <li>
                Use your <code>webhookSecret</code> to compute the HMAC-SHA256
                signature.
              </li>
              <li>
                Compare it with <code>X-Webhook-Signature</code>. If they match,
                the request is authentic.
              </li>
            </ol>

            <p className="text-muted-foreground font-medium">
              ❗️ Reject the request if the signature doesn’t match, or if the
              timestamp is too old (e.g., older than 5 minutes) to prevent
              replay attacks.
            </p>
          </div>
        </div>

        {/* <div className="grid gap-5 divide-y border-y">
          <div className="space-y-4 p-5">
            <div className="size-[30px] rounded-full text-center text-black bg-white text-lg font-bold">
              1
            </div>
            <div className="text-xl font-bold">Create an account</div>

            <p className="text-muted-foreground">
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
          </div>

          <div className="space-y-4 p-5">
            <div className="size-[30px] rounded-full text-center text-black bg-white text-lg font-bold">
              2
            </div>
            <div className="text-xl font-bold">Register your webhook</div>

            <p className="text-muted-foreground">
              Head over to the{" "}
              <Link
                href="/webhooks"
                className="text-blue-600 underline font-medium"
              >
                Webhooks section
              </Link>{" "}
              in your dashboard and click "Setup Webhook”.
            </p>

            <ul className="list-disc list-inside pl-4 mb-4 text-base">
              <li>
                <strong>Name:</strong> Anything you like (e.g., "My Server")
              </li>
              <li>
                <strong>URL:</strong>{" "}
                <code className="bg-gray-800 px-1 rounded">
                  https://yourdomain.com/webhook
                </code>
              </li>
            </ul>
            <p className="text-muted-foreground">
              Need more details? Check out the{" "}
              <a
                href="https://docs.schedify.dev/docs/"
                className="text-blue-600 underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </div>

          <div className="space-y-4 p-5">
            <div className="size-[30px] rounded-full text-center text-black bg-white text-lg font-bold">
              3
            </div>
            <div className="text-xl font-bold">Schedule your first task</div>

            <p className="text-muted-foreground">
              Trigger notifications at specific times via
            </p>
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
                <div className="inline-flex items-center gap-2">
                  <span>📦 SDK (Node, Python, etc.) </span>
                  <div className="bg-white text-sm font-bold text-background px-3 py-1">
                    COMING SOON
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4 p-5">
            <div className="size-[30px] rounded-full text-center text-black bg-white text-lg font-bold">
              4
            </div>
            <div className="text-xl font-bold">Handle incoming events</div>

            <p className="text-muted-foreground">
              When it’s time, we’ll send a signed HTTP POST to your webhook like
              this:
            </p>

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

            <p className="mt-4 text-muted-foreground">
              🛡️ <strong>Pro tip:</strong> Always verify the{" "}
              <code className="bg-gray-900 px-1 rounded">
                X-Schedify-Signature
              </code>{" "}
              using your webhook secret to ensure authenticity.
            </p>
          </div>
        </div> */}
      </section>
    </div>
  );
}

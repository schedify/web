import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <div className="container pb-20 space-y-10">
      <h1 className="text-3xl font-medium font-poppins tracking-tight lg:text-5xl">
        FAQs
      </h1>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Schedify?</AccordionTrigger>
          <AccordionContent>
            Schedify is a webhook scheduling platform that allows you to
            schedule HTTP requests to be sent at specified times. It's perfect
            for task automation, delayed notifications, and time-based
            workflows.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>What is Webhook?</AccordionTrigger>
          <AccordionContent>
            Webhooks are a common name for HTTP callbacks, and are a way for
            services to notify each other of events. Webhooks are part of a
            service's API, though you can think of them as a sort of a "reverse
            API". When a client wants to make a request to a service they make
            an API call, and when the service wants to notify the client of an
            event the service triggers a webhook ("a user has paid", "task has
            finished", etc.).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How does Schedify work?</AccordionTrigger>
          <AccordionContent>
            You provide a webhook URL, the payload, and the time you want it to
            be triggered. Schedify takes care of securely storing, scheduling,
            and dispatching the webhook exactly when needed.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is there a free tier?</AccordionTrigger>
          <AccordionContent>
            Yes! Schedify offers a free tier for developers and small-scale use.
            It includes a limited number of scheduled webhooks per month and
            access to core features.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            How do I authenticate with the API?
          </AccordionTrigger>
          <AccordionContent>
            You can authenticate using Clerk for user-based access or API keys
            for programmatic access. API keys can be generated from your
            dashboard.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            What if my webhook fails to deliver?
          </AccordionTrigger>
          <AccordionContent>
            Schedify includes retry logic with exponential backoff for failed
            deliveries. You can view delivery logs and errors in your dashboard
            to take appropriate actions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

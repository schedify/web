import { CreateTaskForm } from "./_comp/CreateTaskForm";

export default function ScheduleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container p-0 border-x min-h-screen pt-5">
      <section className="relative">
        <header className="border-b border-border p-6  sticky bg-background">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Schedule Task
          </h1>
          <p className="mt-3 text-gray-700 dark:text-gray-400">
            Run server tasks that send requests to your URL. Failed requests are
            retried automatically.
          </p>
        </header>

        {children}
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-(--background) px-6">
      <div className="text-center max-w-xl">
        <h1 className="font-second text-[120px] md:text-[160px] leading-none text-(--beige)">
          404
        </h1>

        <h2 className="font-second text-2xl md:text-3xl font-bold text-(--foreground) mt-4">
          Page not found
        </h2>

        <p className="text-gray-600 mt-3 mb-8 leading-relaxed">
          The page you are looking for doesn’t exist or has been moved. But
          don’t worry — investment opportunities are still waiting for you.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="button bg-(--beige) text-(--light-text) px-6 py-3 hover:bg-(--light-text) hover:text-(--beige)"
          >
            To Home Page
          </Link>
        </div>
      </div>
    </section>
  );
}

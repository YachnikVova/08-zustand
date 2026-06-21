import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import css from "./NotFound.module.css";

export const metadata: Metadata = buildMetadata({
  title: "404 — Page not found",
  description: "Sorry, the page you are looking for does not exist.",
  path: "/not-found",
});

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}

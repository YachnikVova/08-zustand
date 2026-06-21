import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import { buildMetadata } from "@/lib/seo";
import css from "./CreateNote.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Create note",
  description: "Create a new personal note in NoteHub.",
  path: "/notes/action/create",
});

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

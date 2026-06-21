"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "@/lib/api/notes";
import { NOTE_TAGS } from "@/lib/constants";
import { useNoteDraftStore, type NoteDraft } from "@/lib/store/noteStore";
import type { CreateNoteData } from "@/types/note";
import css from "./NoteForm.module.css";

type FormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const handleChange = (event: React.ChangeEvent<FormField>) => {
    const { name, value } = event.target;
    setDraft({ [name]: value } as Partial<NoteDraft>);
  };

  const handleSubmit = (formData: FormData) => {
    const payload: CreateNoteData = {
      title: String(formData.get("title") ?? "").trim(),
      tag: draft.tag,
    };

    const content = String(formData.get("content") ?? "").trim();
    if (content) {
      payload.content = content;
    }

    mutation.mutate(payload);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          value={draft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.input}
          name="tag"
          value={draft.tag}
          onChange={handleChange}
        >
          {NOTE_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}

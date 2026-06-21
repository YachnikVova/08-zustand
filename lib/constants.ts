import type { NoteTag } from "@/types/note";

export const NOTE_TAGS: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export const isNoteTag = (value: string): value is NoteTag =>
  (NOTE_TAGS as string[]).includes(value);

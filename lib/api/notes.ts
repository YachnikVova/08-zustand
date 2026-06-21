import notehubApi from "./client";
import type { CreateNoteData, Note, NoteTag } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesQuery {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

const DEFAULT_PER_PAGE = 12;

export async function getNotes({
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  search = "",
  tag,
}: NotesQuery = {}): Promise<NotesResponse> {
  const params: Record<string, string | number> = { page, perPage };

  const query = search.trim();
  if (query) {
    params.search = query;
  }
  if (tag) {
    params.tag = tag;
  }

  const { data } = await notehubApi.get<NotesResponse>("", { params });
  return data;
}

export async function getNote(id: string): Promise<Note> {
  const { data } = await notehubApi.get<Note>(`/${id}`);
  return data;
}

export async function addNote(payload: CreateNoteData): Promise<Note> {
  const { data } = await notehubApi.post<Note>("", payload);
  return data;
}

export async function removeNote(id: string): Promise<Note> {
  const { data } = await notehubApi.delete<Note>(`/${id}`);
  return data;
}

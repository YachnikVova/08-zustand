import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNotes } from "@/lib/api/notes";
import { isNoteTag } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

const INITIAL_PAGE = 1;
const PER_PAGE = 12;

interface NotesFilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: NotesFilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const selectedTag = slug[0];
  const filterName = selectedTag === "all" ? "All notes" : selectedTag;

  return buildMetadata({
    title: `NoteHub — ${filterName}`,
    description: `Browse notes filtered by ${filterName}.`,
    path: `/notes/filter/${selectedTag}`,
  });
}

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const { slug } = await params;
  const selectedTag = slug[0];

  if (!selectedTag) {
    notFound();
  }

  let tag: NoteTag | undefined;
  if (selectedTag !== "all") {
    if (!isNoteTag(selectedTag)) {
      notFound();
    }
    tag = selectedTag;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", selectedTag, "", INITIAL_PAGE],
    queryFn: () =>
      getNotes({
        page: INITIAL_PAGE,
        perPage: PER_PAGE,
        search: "",
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient selectedTag={selectedTag} tag={tag} />
    </HydrationBoundary>
  );
}

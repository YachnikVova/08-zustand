"use client";

import { useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/notes";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesPage.module.css";

const PER_PAGE = 12;

interface NotesClientProps {
  selectedTag: string;
  tag?: NoteTag;
}

export default function NotesClient({ selectedTag, tag }: NotesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const debouncedTerm = useDebouncedValue(searchTerm);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", selectedTag, debouncedTerm, page],
    queryFn: () =>
      getNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedTerm,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    throw error;
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </div>

      <NoteList notes={notes} />
    </>
  );
}

import type { Metadata } from "next";

export const SITE_URL = "https://08-zustand.vercel.app";
export const OG_IMAGE =
  "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path?: string;
}

export function buildMetadata({
  title,
  description,
  path = "",
}: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "NoteHub — manage your personal notes",
        },
      ],
    },
  };
}

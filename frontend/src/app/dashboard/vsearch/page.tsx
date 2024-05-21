import * as React from "react";
import type { Metadata } from "next";
import VideoSearch from "@/components/videos/video-search";

export const metadata = { title: `Feelify | Video Search ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <VideoSearch />;
}

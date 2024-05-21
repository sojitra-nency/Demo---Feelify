import * as React from "react";
import type { Metadata } from "next";
import EmotionBooks from "@/components/books/emotion-books";

export const metadata = { title: `Feelify | Books | Sad ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionBooks
      title="Book Recommendation for Sad Emotion"
      queries={[
        "Uplifting ",
        "Comforting ",
        "meditation",
        "friendship",
        "Spiritual ",
        "love",
        "creative",
        "mentalhealth",
        "motivation",
        "Healing",
      ]}
      subtitle={[
        "Uplifting Books",
        "Comforting Books",
        "Meditational Books",
        "Books on Friendship",
        "Spiritual Books",
        "Romantic Books",
        "Creative Books",
        "Books for Mental Health",
        "Motivational Books",
        "Healing Books",
      ]}
    />
  );
}

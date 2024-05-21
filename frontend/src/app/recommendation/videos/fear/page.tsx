import * as React from "react";
import type { Metadata } from "next";
import EmotionVideos from "@/components/videos/emotion-videos";

export const metadata = {
  title: `Feelify | Videos | Fear `,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionVideos
      title="Turn those goosebumps into laughter. It's video therapy time!"
      queries={[
        "anxietyrelief",
        "calmingmusic",
        "guidedmeditation",
        "copingwithfear",
        "overcominganxiety",
        "stressmanagement",
        "relaxationtechniques",
        "mindfulnesspractices",
        "selfcaretips",
        "inspirationalstories",
      ]}
      subtitle={[
        "Anxiety Relief",
        "Calming Music",
        "Guided Meditation",
        "Coping With Fear",
        "Overcoming Anxiety",
        "Stress Management",
        "Relaxation Techniques",
        "Mindfulness Practices",
        "Self-Care Tips",
        "Inspirational Stories",
      ]}
    />
  );
}

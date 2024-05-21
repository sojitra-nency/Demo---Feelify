"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

export default function Page(): React.JSX.Element {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.auth.signIn);
  }, [router]);

  return <></>;
}

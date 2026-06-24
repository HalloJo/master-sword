"use client";

import dynamic from "next/dynamic";

const SwordScene = dynamic(() => import("@/components/SwordScene"), {
  ssr: false,
});

export default function ClientOnly() {
  return <SwordScene />;
}

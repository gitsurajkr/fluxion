"use client";

import { usePathname } from "next/navigation";
import { Footeer } from "@/components/Footeer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  const noFooter = ["/signin", "/signup"];

  const hideFooter = noFooter.includes(pathname);

  return (
    <>
      {children}
      {!hideFooter && <Footeer />}
    </>
  );
}

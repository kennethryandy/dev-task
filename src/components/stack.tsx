import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Stack({
  children,
  className = "",
}: {
  children: ReactNode;
  className: string | undefined;
}) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

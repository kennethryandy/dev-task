import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StackProps {
  children: ReactNode;
  className?: string;
}

export default function Stack({ children, className = "" }: StackProps) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

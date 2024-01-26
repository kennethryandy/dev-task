import React, { type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  children: ReactNode;
  separator?: string | ReactElement;
  className?: string;
  listClassName?: string;
}

// Define a type for a list of React elements with separators
type ElementsWithSeparators = ReactElement<any>[];

function insertSeparators<T extends ReactElement>({
  items,
  separator,
}: {
  items: T[];
  separator: string | ReactElement;
}): ElementsWithSeparators {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(
        current,
        <li
          aria-hidden
          key={`separator-${index}`}
          className="mx-1 flex select-none opacity-50"
        >
          {separator}
        </li>
      );
    } else {
      acc.push(current);
    }

    return acc;
  }, [] as ElementsWithSeparators);
}

export default function Breadcrumbs({
  children,
  className = "",
  listClassName = "",
  separator = "/",
}: BreadcrumbProps) {
  const allItems = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child))
    .map((child, i) => {
      return (
        <li key={i} className={listClassName}>
          {child}
        </li>
      );
    });
  return (
    <nav>
      <ol
        className={cn(
          "m-0 flex list-none flex-wrap items-center p-0",
          className
        )}
      >
        {insertSeparators({
          items: allItems,
          separator,
        })}
      </ol>
    </nav>
  );
}

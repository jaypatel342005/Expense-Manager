"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_SCROLL_MS = 3500;

interface PageControlProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Invisible component — only runs the auto-scroll timer.
 * Visual controls are rendered by EventBlockNav inside each event block.
 */
export function EventPageControls({ totalPages, currentPage, onPageChange }: PageControlProps) {
  useEffect(() => {
    if (totalPages <= 1) return;
    const id = setInterval(() => {
      onPageChange((currentPage + 1) % totalPages);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [totalPages, currentPage, onPageChange]);

  return null; // No DOM output — nav is on each event block via EventBlockNav
}

/**
 * Renders < > buttons + page counter directly on an event block.
 * Should be placed as a sibling inside the absolute event wrapper div.
 * showPrev/showNext control which edges show a button (for multi-column pages,
 * only the leftmost block should show < and the rightmost should show >).
 */
export function EventBlockNav({
  totalPages,
  currentPage,
  onPageChange,
  showPrev = true,
  showNext = true,
  totalEvents,
  perPage = 1,
}: PageControlProps & { showPrev?: boolean; showNext?: boolean; totalEvents: number; perPage?: number }) {
  if (totalPages <= 1) return null;

  const lastVisible = Math.min((currentPage + 1) * perPage, totalEvents);

  return (
    <>
      {/* Prev button — left edge, only on first block in page */}
      {showPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPageChange(Math.max(0, currentPage - 1)); }}
          disabled={currentPage === 0}
          className={cn(
            "absolute left-0 top-1/2 z-20 -translate-y-1/2 flex size-5 items-center justify-center rounded-r-md bg-background/90 border-r border-y border-border shadow hover:bg-accent transition-opacity",
            currentPage === 0 && "opacity-30 pointer-events-none"
          )}
          aria-label="Previous event"
        >
          <ChevronLeft className="size-3" />
        </button>
      )}

      {/* Next button — right edge, only on last block in page */}
      {showNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onPageChange(Math.min(totalPages - 1, currentPage + 1)); }}
          disabled={currentPage >= totalPages - 1}
          className={cn(
            "absolute right-0 top-1/2 z-20 -translate-y-1/2 flex size-5 items-center justify-center rounded-l-md bg-background/90 border-l border-y border-border shadow hover:bg-accent transition-opacity",
            currentPage >= totalPages - 1 && "opacity-30 pointer-events-none"
          )}
          aria-label="Next event"
        >
          <ChevronRight className="size-3" />
        </button>
      )}

      {/* Event counter — e.g. 3/6 */}
      {showNext && (
        <span className="absolute top-0.5 right-6 z-20 rounded-full bg-background/80 px-1.5 py-px text-[9px] font-semibold text-muted-foreground border border-border shadow-sm pointer-events-none">
          {lastVisible}/{totalEvents}
        </span>
      )}
    </>
  );
}

/** How many overlapping event groups to show per page in week view */
export const EVENTS_PER_PAGE = 1;

/** Returns the slice of groups visible on the current page */
export function getVisibleGroups<T>(groups: T[], page: number, perPage = EVENTS_PER_PAGE): T[] {
  return groups.slice(page * perPage, (page + 1) * perPage);
}

/** Total number of pages for a set of groups */
export function getTotalPages(groupCount: number, perPage = EVENTS_PER_PAGE): number {
  return Math.ceil(groupCount / perPage);
}

/** Hook that encapsulates page state + auto-reset when groupCount changes */
export function useEventPage(groupCount: number, perPage = EVENTS_PER_PAGE) {
  const [page, setPage] = useState(0);
  const totalPages = getTotalPages(groupCount, perPage);

  useEffect(() => {
    setPage(0);
  }, [groupCount]);

  const goTo = useCallback(
    (p: number) => setPage(Math.max(0, Math.min(p, totalPages - 1))),
    [totalPages]
  );

  return { page, setPage: goTo, totalPages };
}

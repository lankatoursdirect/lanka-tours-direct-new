"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
} & {
  buttonVariant?["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size] [[data-slot=card-content]_&]-transparent [[data-slot=popover-content]_&]-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root("w-fit", defaultClassNames.root),
        months("relative flex flex-col gap-4 md:row", defaultClassNames.months),
        month("flex w-full flex-col gap-4", defaultClassNames.month),
        nav(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous(
          buttonVariants({ variant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next(
          buttonVariants({ variant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root(
          "has-focus:ring border-input shadow-xs has-focus:ring/50 has-focus-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root,
        ),
        dropdown("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays("flex", defaultClassNames.weekdays),
        weekday(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday,
        ),
        week("mt-2 flex w-full", defaultClassNames.week),
        week_number_header("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&-child[data-selected=true]_button]-l-md [&-child[data-selected=true]_button]-r-md",
          defaultClassNames.day,
        ),
        range_start("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle("rounded-none", defaultClassNames.range_middle),
        range_end("bg-accent rounded-r-md", defaultClassNames.range_end),
        today(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]-none",
          defaultClassNames.today,
        ),
        outside(
          "text-muted-foreground aria-selected-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        DayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]-primary data-[selected-single=true]-primary-foreground data-[range-middle=true]-accent data-[range-middle=true]-accent-foreground data-[range-start=true]-primary data-[range-start=true]-primary-foreground data-[range-end=true]-primary data-[range-end=true]-primary-foreground group-data-[focused=true]/day-ring group-data-[focused=true]/day-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]-md data-[range-middle=true]-none data-[range-start=true]-md group-data-[focused=true]/day group-data-[focused=true]/day-10 group-data-[focused=true]/day-[3px] [&>span]-xs [&>span]-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };












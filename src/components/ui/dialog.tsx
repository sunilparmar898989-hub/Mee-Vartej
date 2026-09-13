import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-ink/40", className)}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  title,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { title?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 left-1/2 top-1/2 w-[min(100%-1.5rem,28rem)] -translate-x-1/2 -translate-y-1/2",
          "rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-[var(--shadow-float)]",
          "max-h-[min(90dvh,40rem)] overflow-y-auto",
          className,
        )}
        {...props}
      >
        {title ? (
          <DialogPrimitive.Title className="font-display text-lg text-ink pr-8">
            {title}
          </DialogPrimitive.Title>
        ) : (
          <DialogPrimitive.Title className="sr-only">સંવાદ</DialogPrimitive.Title>
        )}
        <DialogPrimitive.Close
          className="absolute right-3 top-3 size-9 inline-flex items-center justify-center rounded-[var(--radius-sm)] text-muted hover:bg-bg-recessed hover:text-ink"
          aria-label="બંધ"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

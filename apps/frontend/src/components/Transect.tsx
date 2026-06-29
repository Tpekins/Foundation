import { cn } from "../lib/utils";

export function Transect({ className, thin = false }: { className?: string; thin?: boolean }) {
  return (
    <div 
      className={cn(
        "bg-[linear-gradient(90deg,var(--color-soil)_0%,var(--color-laterite)_22%,var(--color-ochre)_46%,var(--color-cassava)_68%,var(--color-signal)_100%)]",
        thin ? "h-[3px]" : "h-[6px]",
        className
      )}
    />
  );
}

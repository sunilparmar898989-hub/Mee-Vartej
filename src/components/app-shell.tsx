import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Cylinder, Fuel, Users, Wallet } from "lucide-react";
import { DateBar } from "@/components/date-bar";
import { useHisab } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "રોજમેળ", icon: BookOpen },
  { to: "/sales", label: "વેચાણ", icon: Fuel },
  { to: "/cash", label: "રોકડ", icon: Wallet },
  { to: "/parties", label: "પાર્ટી", icon: Users },
  { to: "/stock", label: "ટાંકી", icon: Cylinder },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    void Promise.resolve(useHisab.persist.rehydrate());
  }, []);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-ink flex flex-col lg:flex-row">
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-line bg-surface">
        <Brand />
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => {
            const active = isActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 h-11 px-3 rounded-[var(--radius-md)] text-sm font-medium",
                  active
                    ? "bg-forest text-surface-2"
                    : "text-ink-soft hover:bg-bg-recessed",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <p className="px-5 pb-5 text-xs text-faint leading-relaxed">
          ડીઝલ પંપ — ઉધાર, રોકડ, ટાંકી અને રહેદનો રોજનો હિસાબ.
        </p>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 pb-[4.5rem] lg:pb-0">
        <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur-sm">
          <div className="lg:hidden">
            <Brand compact />
          </div>
          <div className="px-3 py-2.5 sm:px-5">
            <DateBar />
          </div>
        </header>
        <main className="flex-1 px-3 py-4 sm:px-5 sm:py-6 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-surface/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-5">
          {NAV.map((item) => {
            const active = isActive(pathname, item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 h-14 text-[11px] font-medium",
                    active ? "text-forest" : "text-muted",
                  )}
                >
                  <item.icon className="size-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("px-4", compact ? "pt-4 pb-1" : "pt-6 pb-4")}>
      <p className="text-center text-[10px] tracking-[0.35em] text-rule font-medium">
        ॥ શ્રી ગણેશાય નમઃ ॥
      </p>
      <h1
        className={cn(
          "text-center font-display text-forest-2",
          compact ? "text-xl mt-0.5" : "text-2xl mt-1",
        )}
      >
        રોજમેળ
      </h1>
      <p className={cn("text-center text-muted", compact ? "text-[11px] mt-0" : "text-xs mt-1")}>
        ડીઝલ પંપ હિસાબ
      </p>
    </div>
  );
}

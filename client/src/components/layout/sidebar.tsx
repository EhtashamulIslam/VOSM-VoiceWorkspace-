import { Link, useLocation } from "wouter";
import { Mic, FileText, Settings, Home, Code, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  const links = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/files", icon: FileText, label: "Files" },
    { href: "/editor", icon: Code, label: "Editor" },
    { href: "/terminal", icon: Terminal, label: "Terminal" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <Mic className="text-primary-foreground w-5 h-5" />
        </div>
        <h1 className="text-xl font-display font-bold text-sidebar-foreground tracking-wider">
          VOSW
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {links.map((link) => {
          const isActive = location === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group",
                  isActive
                    ? "bg-sidebar-accent text-primary border border-primary/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <link.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-sidebar-foreground/60 group-hover:text-primary"
                  )}
                />
                <span className="font-medium">{link.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="p-3 rounded bg-sidebar-accent/50 border border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/50 uppercase font-display mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-green-400">Online</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary">LLM Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

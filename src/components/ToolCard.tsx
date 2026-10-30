import React, { memo } from "react";
import { ExternalLink, Bookmark, Sparkles, TrendingUp, Heart } from "lucide-react";
import type { Tool } from "../types/tool";

interface ToolCardProps {
  tool: Tool;
  saved: boolean;
  onToggleSave: () => void;
  onSelect: () => void;
}

const PRICING_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  Free: { bg: "bg-gradient-to-r from-emerald-500 to-green-500", text: "text-white", label: "🏢 Free" },
  "Free Plan": { bg: "bg-gradient-to-r from-green-500 to-emerald-500", text: "text-white", label: "💎 Free Plan" },
  "Free Trial": { bg: "bg-gradient-to-r from-sky-500 to-blue-500", text: "text-white", label: "🌟 Free Trial" },
  "Free Credits": { bg: "bg-gradient-to-r from-violet-500 to-purple-500", text: "text-white", label: "🏆 Free Credits" },
  "Daily Free": { bg: "bg-gradient-to-r from-cyan-500 to-teal-500", text: "text-white", label: "⭐ Daily Free" },
  "Monthly Free": { bg: "bg-gradient-to-r from-teal-500 to-cyan-500", text: "text-white", label: "📅 Monthly Free" },
  Paid: { bg: "bg-gradient-to-r from-amber-500 to-orange-500", text: "text-white", label: "💰 Paid" },
  "Paid Plans": { bg: "bg-gradient-to-r from-orange-500 to-red-500", text: "text-white", label: "🔥 Paid Plans" },
  "Open Source": { bg: "bg-gradient-to-r from-blue-500 to-indigo-500", text: "text-white", label: "📚 Open Source" },
  unknown: { bg: "bg-gradient-to-r from-zinc-400 to-zinc-500", text: "text-white", label: "❓ Unknown" },
  Unknown: { bg: "bg-gradient-to-r from-zinc-400 to-zinc-500", text: "text-white", label: "❓ Unknown" },
  freemium: { bg: "bg-gradient-to-r from-indigo-500 to-violet-500", text: "text-white", label: "🎯 Freemium" },
};

function getToolGradient(name: string) {
  const gradients = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-600",
    "from-cyan-500 to-blue-600",
    "from-amber-500 to-yellow-500",
    "from-fuchsia-500 to-purple-600",
    "from-lime-500 to-green-600",
    "from-sky-500 to-indigo-500",
    "from-red-500 to-orange-500",
    "from-teal-500 to-cyan-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return gradients[Math.abs(hash) % gradients.length];
}

function initials(name: string) {
  return (name || "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export const ToolCard = memo(function ToolCard({
  tool,
  saved,
  onToggleSave,
  onSelect,
}: ToolCardProps) {
  const pricingStyle = PRICING_STYLES[tool.p] || PRICING_STYLES.Unknown;
  const gradient = getToolGradient(tool.n);

  return (
    <article
      id={`tool-${tool.n.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      onClick={onSelect}
      className={`group relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
        tool.ex
          ? "border-fuchsia-500/50 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-purple-500/10 shadow-sm shadow-fuchsia-500/10 hover:border-fuchsia-500"
          : "border-border bg-card hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <div>
        {/* Header: Logo, Name, Category & Pricing */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {tool.fl ? (
              <img
                src={tool.fl}
                alt={tool.n}
                className="size-11 rounded-lg object-cover border border-border shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div
                className={`size-11 shrink-0 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white shadow-sm text-sm`}
              >
                {initials(tool.n)}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-semibold text-base text-foreground truncate group-hover:text-primary transition-colors">
                  {tool.n}
                </h3>
                {tool.ex && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-fuchsia-500/10 px-1.5 py-0.5 text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400">
                    <Sparkles className="size-2.5" /> Exclusive
                  </span>
                )}
                {tool.tr && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                    <TrendingUp className="size-2.5" /> Hot
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground truncate block">
                {tool.c || "AI General"}
              </span>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${pricingStyle.bg} ${pricingStyle.text}`}
          >
            {pricingStyle.label}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {tool.d || "No description provided for this AI tool."}
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
        <span className="text-[11px] font-medium text-primary hover:underline flex items-center gap-1">
          Learn more &rarr;
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            id={`bookmark-${tool.n.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            title={saved ? "Remove from bookmarks" : "Bookmark tool"}
            className={`rounded-lg p-1.5 transition-colors ${
              saved
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Bookmark className={`size-4 ${saved ? "fill-amber-500 text-amber-500" : ""}`} />
          </button>

          {tool.u && (
            <a
              href={tool.u}
              id={`visit-${tool.n.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Visit official website"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
            >
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
});

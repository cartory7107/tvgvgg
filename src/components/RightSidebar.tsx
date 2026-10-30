import React from "react";
import { TrendingUp, Newspaper, ExternalLink, Flame, Sparkles, Trophy } from "lucide-react";
import type { Tool, AINewsItem } from "../types/tool";

interface RightSidebarProps {
  trendingTools: Tool[];
  news: AINewsItem[];
  onSelectTool: (tool: Tool) => void;
}

export function RightSidebar({ trendingTools, news, onSelectTool }: RightSidebarProps) {
  return (
    <aside className="space-y-5 sticky top-20">
      {/* Trending AI Tools */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Flame className="size-4 text-amber-500" />
          <h3 className="font-bold text-sm text-foreground">Trending AI</h3>
          <span className="ml-auto rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
            Viral
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {trendingTools.slice(0, 5).map((tool, idx) => (
            <div
              key={tool.n}
              onClick={() => onSelectTool(tool)}
              className="group flex items-center justify-between rounded-xl p-2 hover:bg-muted/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-xs text-foreground truncate group-hover:text-primary transition-colors">
                    {tool.n}
                  </h4>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    {tool.c}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-medium text-muted-foreground shrink-0 rounded-md bg-muted px-1.5 py-0.5">
                {tool.p}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI News Feed */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Newspaper className="size-4 text-blue-500" />
          <h3 className="font-bold text-sm text-foreground">AI Intelligence News</h3>
        </div>

        <div className="mt-3 space-y-3">
          {news.slice(0, 5).map((item, idx) => (
            <div key={idx} className="group text-xs">
              <a
                href={item.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
              >
                {item.title}
              </a>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{item.source || "AI Daily"}</span>
                <span>&bull;</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Featured Banner */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="size-4 text-primary" />
          <h4 className="font-bold text-xs text-foreground">Discover with MarkBook</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Over 96,000 tools cataloged and updated daily. Submit your tool to reach our AI builder community.
        </p>
      </div>
    </aside>
  );
}

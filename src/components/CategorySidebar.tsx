import React, { useState } from "react";
import { Search, Sparkles, FolderOpen, Layers } from "lucide-react";

interface CategorySidebarProps {
  categories: Record<string, number>;
  categoryEmojis: Record<string, string>;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  totalTools: number;
}

export function CategorySidebar({
  categories,
  categoryEmojis,
  activeCategory,
  onSelectCategory,
  totalTools,
}: CategorySidebarProps) {
  const [filter, setFilter] = useState("");

  const sortedCategories = React.useMemo(() => {
    return Object.entries(categories).sort((a, b) => b[1] - a[1]);
  }, [categories]);

  const filtered = React.useMemo(() => {
    if (!filter.trim()) return sortedCategories;
    const lower = filter.toLowerCase();
    return sortedCategories.filter(([cat]) => cat.toLowerCase().includes(lower));
  }, [sortedCategories, filter]);

  return (
    <aside className="sticky top-20 flex flex-col rounded-2xl border border-border bg-card p-4 h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <FolderOpen className="size-4 text-primary" />
          <h2 className="font-bold text-sm text-foreground">Categories</h2>
        </div>
        <span className="text-[11px] font-semibold text-muted-foreground">
          {sortedCategories.length} Topics
        </span>
      </div>

      {/* Category search */}
      <div className="relative mt-3 mb-2">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter categories..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-border bg-muted/50 pl-8 pr-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:bg-background focus:outline-hidden focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-xs">
        <button
          onClick={() => onSelectCategory("All")}
          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 font-medium transition-colors ${
            activeCategory === "All"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-2">
            <span>✨</span> All Categories
          </span>
          <span
            className={`text-[10px] rounded-full px-1.5 py-0.2 ${
              activeCategory === "All" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            {totalTools > 0 ? `${Math.round(totalTools / 1000)}k` : "96k"}
          </span>
        </button>

        {filtered.map(([cat, count]) => {
          const emoji = categoryEmojis[cat] || "🤖";
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2 truncate pr-1">
                <span className="shrink-0">{emoji}</span>
                <span className="truncate">{cat}</span>
              </span>
              <span
                className={`text-[10px] rounded-full px-1.5 py-0.2 shrink-0 ${
                  isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

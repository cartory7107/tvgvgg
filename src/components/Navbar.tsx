import React from "react";
import { Search, Moon, Sun, Bookmark, Sparkles, Plus, Menu, X, Trophy, Grid, Newspaper } from "lucide-react";

interface NavbarProps {
  query: string;
  onQueryChange: (q: string) => void;
  dark: boolean;
  onToggleDark: () => void;
  totalTools: number;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSubmit: () => void;
  onSelectCategory: (cat: string) => void;
  onScrollToFeed: () => void;
  onOpenNews: () => void;
}

export function Navbar({
  query,
  onQueryChange,
  dark,
  onToggleDark,
  totalTools,
  savedCount,
  onOpenSaved,
  onOpenSubmit,
  onSelectCategory,
  onScrollToFeed,
  onOpenNews,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="glass-nav sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onQueryChange("");
              onSelectCategory("All");
              onScrollToFeed();
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img
              src="/favicon-new.png"
              alt="MarkBook"
              className="size-9 rounded-xl object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
            />
            <div>
              <span className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1.5">
                MarkBook
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                  AI Hub
                </span>
              </span>
              <span className="hidden sm:block text-[10px] text-muted-foreground -mt-0.5">
                {(totalTools || 96000).toLocaleString()}+ Tools Indexed
              </span>
            </div>
          </a>
        </div>

        {/* Global Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            id="global-search-input"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search AI tools (e.g., ChatGPT, Claude, Midjourney, Video, Coding)..."
            className="w-full rounded-xl border border-border bg-muted/50 pl-10 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Navigation Links & Actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              onSelectCategory("All");
              onScrollToFeed();
            }}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Grid className="size-3.5" /> Directory
          </button>

          <button
            onClick={onOpenNews}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Newspaper className="size-3.5" /> AI News
          </button>

          <button
            id="saved-drawer-btn"
            onClick={onOpenSaved}
            className="relative flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Bookmark className="size-3.5" /> Saved
            {savedCount > 0 && (
              <span className="rounded-full bg-primary px-1.5 py-0.2 text-[10px] font-bold text-primary-foreground">
                {savedCount}
              </span>
            )}
          </button>

          <button
            id="theme-toggle-btn"
            onClick={onToggleDark}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            id="submit-tool-btn"
            onClick={onOpenSubmit}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="size-3.5" /> Submit Tool
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenSaved}
            className="relative p-2 text-muted-foreground hover:text-foreground"
          >
            <Bookmark className="size-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleDark}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory("All");
                onScrollToFeed();
                setMobileMenuOpen(false);
              }}
              className="rounded-xl border border-border p-2.5 text-xs font-medium text-foreground text-left"
            >
              📁 All Categories
            </button>
            <button
              onClick={() => {
                onOpenNews();
                setMobileMenuOpen(false);
              }}
              className="rounded-xl border border-border p-2.5 text-xs font-medium text-foreground text-left"
            >
              📰 AI News
            </button>
          </div>
          <button
            onClick={() => {
              onOpenSubmit();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
          >
            <Plus className="size-4" /> Submit an AI Tool
          </button>
        </div>
      )}
    </header>
  );
}

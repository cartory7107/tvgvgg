import React from "react";
import { X, ExternalLink, Bookmark, Globe, Sparkles, TrendingUp, Tag, Share2, Check } from "lucide-react";
import type { Tool } from "../types/tool";

interface ToolDetailModalProps {
  tool: Tool | null;
  onClose: () => void;
  saved: boolean;
  onToggleSave: () => void;
  similarTools: Tool[];
  onSelectTool: (tool: Tool) => void;
}

export function ToolDetailModal({
  tool,
  onClose,
  saved,
  onToggleSave,
  similarTools,
  onSelectTool,
}: ToolDetailModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!tool) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="tool-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Top header */}
        <div className="flex items-start gap-4">
          <div className="size-16 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center font-bold text-white text-xl shadow-md">
            {tool.n.slice(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-bold text-foreground">{tool.n}</h2>
              {tool.ex && (
                <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/15 px-2.5 py-0.5 text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                  <Sparkles className="size-3" /> Exclusive
                </span>
              )}
              {tool.tr && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <TrendingUp className="size-3" /> Trending
                </span>
              )}
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <span className="font-medium text-foreground">{tool.c || "AI General"}</span>
              <span>&bull;</span>
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                {tool.p || "Free / Paid"}
              </span>
              {tool.g && (
                <>
                  <span>&bull;</span>
                  <span className="text-xs">{tool.g}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          {tool.u && (
            <a
              id="modal-visit-site-btn"
              href={tool.u}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Globe className="size-4" /> Visit Official Website <ExternalLink className="size-3.5 ml-0.5" />
            </a>
          )}

          <button
            id="modal-bookmark-btn"
            onClick={onToggleSave}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              saved
                ? "border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400"
                : "border-border hover:bg-muted text-foreground"
            }`}
          >
            <Bookmark className={`size-4 ${saved ? "fill-amber-500 text-amber-500" : ""}`} />
            {saved ? "Saved in Bookmarks" : "Save Tool"}
          </button>

          <button
            id="modal-share-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {copied ? <Check className="size-4 text-emerald-500" /> : <Share2 className="size-4" />}
            {copied ? "Link Copied" : "Share"}
          </button>
        </div>

        {/* Description section */}
        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">About {tool.n}</h4>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {tool.d || "No extended description provided. Check out the official website for live documentation, feature guides, and API integration."}
          </p>
        </div>

        {/* Key Features & Tags */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Tag className="size-3.5" /> Discovery Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {[tool.c, tool.p, tool.g, "AI Tool", "MarkBook Verified"].filter(Boolean).map((tag, idx) => (
              <span key={idx} className="rounded-lg bg-secondary px-2.5 py-1 text-xs text-secondary-foreground font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Similar Tools in this Category */}
        {similarTools.length > 0 && (
          <div className="mt-8 border-t border-border pt-6">
            <h4 className="text-sm font-bold text-foreground mb-3">Similar AI Tools in {tool.c}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {similarTools.slice(0, 4).map((sim) => (
                <div
                  key={sim.n}
                  onClick={() => onSelectTool(sim)}
                  className="flex items-center justify-between rounded-xl border border-border p-3 hover:border-primary/50 hover:bg-muted/50 cursor-pointer transition-all"
                >
                  <div className="min-w-0 pr-2">
                    <h5 className="font-semibold text-xs text-foreground truncate">{sim.n}</h5>
                    <p className="text-[11px] text-muted-foreground truncate">{sim.d}</p>
                  </div>
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground shrink-0">
                    {sim.p}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

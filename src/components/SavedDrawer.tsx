import React from "react";
import { X, ExternalLink, Trash2, Bookmark } from "lucide-react";
import type { Tool } from "../types/tool";

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTools: Tool[];
  onRemove: (name: string) => void;
  onClearAll: () => void;
  onSelectTool: (tool: Tool) => void;
}

export function SavedDrawer({
  isOpen,
  onClose,
  savedTools,
  onRemove,
  onClearAll,
  onSelectTool,
}: SavedDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      id="saved-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-card border-l border-border shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bookmark className="size-5 text-primary" />
            <h3 className="font-bold text-lg text-foreground">Saved Tools</h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {savedTools.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedTools.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <Bookmark className="size-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No saved tools yet</p>
              <p className="text-xs mt-1">Bookmark any AI tool while browsing to access it quickly here.</p>
            </div>
          ) : (
            savedTools.map((tool) => (
              <div
                key={tool.n}
                onClick={() => onSelectTool(tool)}
                className="group relative flex items-start justify-between rounded-xl border border-border p-3.5 bg-background hover:border-primary/50 cursor-pointer transition-all"
              >
                <div className="min-w-0 pr-3">
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {tool.n}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{tool.d}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] font-medium text-primary">{tool.c}</span>
                    <span className="text-[10px] rounded-md bg-muted px-1.5 py-0.5 text-muted-foreground">
                      {tool.p}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {tool.u && (
                    <a
                      href={tool.u}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
                      title="Visit website"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(tool.n);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                    title="Remove from saved"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {savedTools.length > 0 && (
          <div className="pt-4 border-t border-border">
            <button
              onClick={onClearAll}
              className="w-full rounded-xl border border-border py-2 text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              Clear All Saved Tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { X, Send, CheckCircle2, Sparkles } from "lucide-react";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onSubmit: (tool: { name: string; url: string; category: string; pricing: string; description: string }) => void;
}

export function SubmitModal({ isOpen, onClose, categories, onSubmit }: SubmitModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("AI Chatbot");
  const [pricing, setPricing] = useState("Free");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    onSubmit({
      name: name.trim(),
      url: url.trim(),
      category,
      pricing,
      description: description.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setUrl("");
      setDescription("");
      onClose();
    }, 1800);
  };

  return (
    <div
      id="submit-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Submit an AI Tool</h3>
            <p className="text-xs text-muted-foreground">List your AI tool on MarkBook to reach thousands of users daily</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="size-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-foreground">Tool Submitted Successfully!</h4>
            <p className="text-xs text-muted-foreground mt-1">Thank you! Your AI tool has been queued for indexing on MarkBook.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Tool Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. DreamCraft AI"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Website URL *</label>
              <input
                type="url"
                required
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                >
                  {categories.slice(0, 30).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Pricing Model</label>
                <select
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                >
                  <option value="Free">Free</option>
                  <option value="Free Plan">Free Plan</option>
                  <option value="Free Trial">Free Trial</option>
                  <option value="Paid">Paid</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Short Description</label>
              <textarea
                rows={3}
                placeholder="What does your tool do? Key capabilities, standout features..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Send className="size-4" /> Submit for Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

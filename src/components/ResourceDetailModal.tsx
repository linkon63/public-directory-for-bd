'use client';

import React, { useState } from 'react';
import { ResourceItem } from '@/lib/types';
import {
  X,
  ExternalLink,
  ChevronUp,
  Code2,
  Copy,
  Check,
  Star,
  Globe,
  Tag,
} from 'lucide-react';
import { formatCompactNumber, cn } from '@/lib/utils';

interface ResourceDetailModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
  onUpvote: (id: string) => void;
  hasUpvoted: boolean;
}

export function ResourceDetailModal({
  resource,
  onClose,
  onUpvote,
  hasUpvoted,
}: ResourceDetailModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!resource) return null;

  const handleCopyCode = () => {
    if (resource.codeSnippet) {
      navigator.clipboard.writeText(resource.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click Backdrop to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl glass-panel bg-[#0b0c10]/95 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resource.author.avatar}
              alt={resource.author.name}
              className="w-12 h-12 rounded-xl object-cover border border-neutral-800"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{resource.title}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {resource.category}
                </span>
              </div>
              <p className="text-xs text-neutral-400">by {resource.author.name} ({resource.author.handle})</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5">
          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Overview</h4>
            <p className="text-sm text-neutral-200 leading-relaxed">{resource.description}</p>
          </div>

          {/* Pricing & Stars Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Pricing Model</span>
              <span className="text-xs font-semibold text-emerald-400">{resource.pricing}</span>
            </div>

            {resource.stars && (
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">GitHub Stars</span>
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-300" />
                  {formatCompactNumber(resource.stars)}
                </span>
              </div>
            )}

            <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Community Upvotes</span>
              <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                <ChevronUp className="w-3 h-3" />
                {formatCompactNumber(resource.upvotes)}
              </span>
            </div>
          </div>

          {/* Code Snippet Box */}
          {resource.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-blue-400" /> Quickstart Code Snippet
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 text-xs transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#07080a] border border-neutral-800 text-xs font-mono text-blue-300 overflow-x-auto">
                <code>{resource.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tags */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-neutral-900 text-neutral-300 border border-neutral-800">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={() => onUpvote(resource.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
              hasUpvoted
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
            )}
          >
            <ChevronUp className="w-4 h-4" />
            <span>{hasUpvoted ? 'Upvoted' : 'Upvote'}</span>
            <span className="px-1.5 py-0.5 rounded bg-black/30 font-mono text-[10px]">
              {formatCompactNumber(resource.upvotes)}
            </span>
          </button>

          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 hover:brightness-110 transition-all"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

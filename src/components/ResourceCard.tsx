'use client';

import React, { useState } from 'react';
import { ResourceItem } from '@/lib/types';
import { formatCompactNumber, cn } from '@/lib/utils';
import {
  ExternalLink,
  ChevronUp,
  Code,
  Share2,
  Check,
  Star,
  Sparkles,
} from 'lucide-react';

interface ResourceCardProps {
  resource: ResourceItem;
  onUpvote: (id: string) => void;
  hasUpvoted: boolean;
  onOpenDetail: (resource: ResourceItem) => void;
}

export function ResourceCard({
  resource,
  onUpvote,
  hasUpvoted,
  onOpenDetail,
}: ResourceCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(resource.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPricingBadgeStyle = (pricing: ResourceItem['pricing']) => {
    switch (pricing) {
      case 'Open Source':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Free':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Freemium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  return (
    <div
      onClick={() => onOpenDetail(resource)}
      className="group relative flex flex-col justify-between glass-card p-5 rounded-2xl cursor-pointer border border-white/10 hover:border-blue-500/40 transition-all duration-300"
    >
      {/* Featured Accent Corner Badge */}
      {resource.featured && (
        <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-bl-xl rounded-tr-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3" /> Featured
          </span>
        </div>
      )}

      <div>
        {/* Header & Upvote */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Author Avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resource.author.avatar}
              alt={resource.author.name}
              className="w-10 h-10 rounded-xl object-cover border border-neutral-800 ring-2 ring-blue-500/10"
            />
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                {resource.title}
              </h3>
              <p className="text-xs text-neutral-400">{resource.author.handle}</p>
            </div>
          </div>

          {/* Upvote Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpvote(resource.id);
            }}
            className={cn(
              'flex flex-col items-center justify-center min-w-12 py-1.5 px-2 rounded-xl border text-xs font-semibold transition-all duration-200',
              hasUpvoted
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30 scale-105'
                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800'
            )}
          >
            <ChevronUp className={cn('w-4 h-4', hasUpvoted ? 'animate-bounce' : '')} />
            <span>{formatCompactNumber(resource.upvotes)}</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-300 line-clamp-2 mb-4 leading-relaxed">
          {resource.description}
        </p>

        {/* Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span
            className={cn(
              'px-2 py-0.5 rounded-md text-[10px] font-medium border',
              getPricingBadgeStyle(resource.pricing)
            )}
          >
            {resource.pricing}
          </span>

          {resource.stars && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-900 text-amber-300 border border-neutral-800">
              <Star className="w-2.5 h-2.5 fill-amber-300" />
              {formatCompactNumber(resource.stars)}
            </span>
          )}

          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] bg-neutral-900/80 text-neutral-400 border border-neutral-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {resource.codeSnippet && (
            <span className="flex items-center gap-1 text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              <Code className="w-3 h-3" /> Snippet Available
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-neutral-800 transition-colors flex items-center gap-1 text-xs"
            title="Visit Resource"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

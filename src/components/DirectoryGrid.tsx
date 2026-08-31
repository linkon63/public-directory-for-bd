'use client';

import React, { useState } from 'react';
import { ResourceItem } from '@/lib/types';
import { ResourceCard } from './ResourceCard';
import { ArrowUpDown, SearchX, Sparkles } from 'lucide-react';

interface DirectoryGridProps {
  resources: ResourceItem[];
  upvotedIds: Set<string>;
  onUpvote: (id: string) => void;
  onOpenDetail: (resource: ResourceItem) => void;
  onResetFilter: () => void;
}

type SortOption = 'upvotes' | 'recent' | 'name' | 'stars';

export function DirectoryGrid({
  resources,
  upvotedIds,
  onUpvote,
  onOpenDetail,
  onResetFilter,
}: DirectoryGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('upvotes');

  const sortedResources = [...resources].sort((a, b) => {
    if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
    if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'stars') return (b.stars || 0) - (a.stars || 0);
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Grid Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-neutral-300">
            Showing {resources.length} {resources.length === 1 ? 'Resource' : 'Resources'}
          </span>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs text-neutral-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="upvotes">Most Upvoted</option>
            <option value="stars">GitHub Stars</option>
            <option value="recent">Recently Added</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {sortedResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onUpvote={onUpvote}
              hasUpvoted={upvotedIds.has(resource.id)}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel rounded-2xl p-12 text-center border border-neutral-800 my-8">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No resources found</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6">
            We couldn&apos;t find any resources matching your current search query or category filter.
          </p>
          <button
            onClick={onResetFilter}
            className="px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600/30 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

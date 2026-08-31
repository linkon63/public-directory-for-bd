'use client';

import React from 'react';
import { CategoryType } from '@/lib/types';
import { CATEGORIES } from '@/lib/directory-data';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  getCategoryCount: (category: CategoryType) => number;
}

export function CategoryFilter({
  activeCategory,
  onSelectCategory,
  getCategoryCount,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        const count = getCategoryCount(category);

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 border',
              isActive
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-sm shadow-blue-500/20'
                : 'bg-neutral-900/60 text-neutral-400 border-neutral-800/80 hover:bg-neutral-800/80 hover:text-neutral-200 hover:border-neutral-700'
            )}
          >
            <span>{category}</span>
            <span
              className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px] font-mono',
                isActive
                  ? 'bg-blue-500/30 text-blue-200'
                  : 'bg-neutral-800 text-neutral-500'
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

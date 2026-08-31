'use client';

import React from 'react';
import { Plus, Terminal } from 'lucide-react';
import { DIRECTORY_STATS } from '@/lib/directory-data';

interface HeaderProps {
  onOpenSubmit: () => void;
  onFocusSearch: () => void;
}

export function Header({ onOpenSubmit, onFocusSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#050507]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-[#09090e] rounded-[11px] flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white fill-current"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">
                Public<span className="text-blue-400">Directory</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Vercel Skillset
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 hidden sm:block">
              {DIRECTORY_STATS.totalResources} Curated Tools &amp; APIs
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Shortcut Trigger */}
          <button
            onClick={onFocusSearch}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-400 text-xs hover:border-neutral-700 hover:text-neutral-200 transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Search directory...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] font-mono text-neutral-400 border border-neutral-700">
              ⌘K
            </kbd>
          </button>

          {/* Github Link */}
          <a
            href="https://github.com/vercel/next.js"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
            title="View Next.js Repository"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* Submit Resource Modal Trigger */}
          <button
            onClick={onOpenSubmit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs font-medium shadow-md shadow-blue-600/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Submit Resource</span>
            <span className="sm:hidden">Submit</span>
          </button>
        </div>
      </div>
    </header>
  );
}

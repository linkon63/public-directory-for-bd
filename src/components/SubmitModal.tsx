'use client';

import React, { useState } from 'react';
import { ResourceItem, CategoryType } from '@/lib/types';
import { CATEGORIES } from '@/lib/directory-data';
import { X, PlusCircle, Sparkles } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newResource: Omit<ResourceItem, 'id' | 'upvotes' | 'createdAt'>) => void;
}

export function SubmitModal({ isOpen, onClose, onSubmit }: SubmitModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('Developer Tools');
  const [tagsInput, setTagsInput] = useState('');
  const [pricing, setPricing] = useState<ResourceItem['pricing']>('Open Source');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorHandle, setAuthorHandle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !description) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSubmit({
      title,
      url: url.startsWith('http') ? url : `https://${url}`,
      description,
      category,
      tags: tags.length > 0 ? tags : ['Developer', 'Tool'],
      pricing,
      codeSnippet: codeSnippet.trim() || undefined,
      author: {
        name: authorName || 'Anonymous Developer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        handle: authorHandle ? (authorHandle.startsWith('@') ? authorHandle : `@${authorHandle}`) : '@community',
      },
    });

    // Reset Form
    setTitle('');
    setUrl('');
    setDescription('');
    setTagsInput('');
    setCodeSnippet('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl glass-panel bg-[#0b0c10]/95 border border-white/10 rounded-2xl p-6 shadow-2xl z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Submit Public Resource</h2>
              <p className="text-xs text-neutral-400">Add a tool, API, or package to the Vercel ecosystem directory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
          <div>
            <label className="block text-neutral-300 font-medium mb-1">Resource Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Next.js Auth Toolkit"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Website URL *</label>
              <input
                type="url"
                required
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">Short Description *</label>
            <textarea
              required
              rows={3}
              placeholder="Provide a concise summary of what this tool does and why developers will love it..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Pricing Model</label>
              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value as ResourceItem['pricing'])}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Open Source">Open Source</option>
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                placeholder="Next.js, TypeScript, AI, Auth"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">Quickstart Code Snippet (Optional)</label>
            <textarea
              rows={2}
              placeholder="pnpm add package-name"
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full bg-[#06070a] border border-neutral-800 rounded-xl px-3 py-2 font-mono text-blue-300 placeholder-neutral-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Alex Developer"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-medium mb-1">X / GitHub Handle</label>
              <input
                type="text"
                placeholder="@alexdev"
                value={authorHandle}
                onChange={(e) => setAuthorHandle(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end gap-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-md shadow-blue-600/20 hover:brightness-110"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

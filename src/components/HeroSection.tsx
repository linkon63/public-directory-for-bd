'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenAdmin: () => void;
  onOpenHowItWorks: () => void;
}

export function HeroSection({ onOpenAdmin, onOpenHowItWorks }: HeroSectionProps) {
  return (
    <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-neutral-200/90 shadow-xs text-xs text-neutral-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-neutral-500 stroke-[2]" />
              <span>Your Area • Your Representatives • Your Voice</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-neutral-900 leading-[1.14]">
              Find Your Local{' '}
              <span className="text-[#008751] block lg:inline">
                Representatives &amp; Government
              </span>{' '}
              Officials in Seconds
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
              Search by Division, District, Upazila, and Union to access verified contact information for your local elected representatives and government administrative officials. Contact them directly or request assistance through our administration.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 bg-[#008751] hover:bg-[#007345] text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-md shadow-emerald-800/15 active:scale-[0.98]"
              >
                <span>Apply Through Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenHowItWorks}
                className="flex items-center justify-center bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/90 px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-xs"
              >
                <span>How it Works</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bangladesh Map Artwork */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square drop-shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <Image
                src="/bangladesh-map-hero.png"
                alt="Bangladesh Map Illustration with City Skyline and Landscape"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

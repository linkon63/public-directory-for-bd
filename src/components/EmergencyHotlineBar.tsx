'use client';

import React from 'react';
import { Phone, PhoneCall } from 'lucide-react';
import { SYLHET_EMERGENCY_HOTLINES } from '@/lib/bangladesh-data';

export function EmergencyHotlineBar() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 pb-6">
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl shadow-emerald-950/5 border border-neutral-100">
        {/* Header Indicator matching SearchCard */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-neutral-700 tracking-tight truncate">
              24/7 Emergency &amp; Public Helplines
            </span>
          </div>

          <span className="text-[11px] font-medium text-neutral-400 shrink-0">
            Sylhet Division • জরুরি হটলাইন
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100 mb-4" />

        {/* Emergency Hotline Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SYLHET_EMERGENCY_HOTLINES.map((hotline, idx) => (
            <a
              key={idx}
              href={`tel:${hotline.number.replace(/[^0-9+]/g, '')}`}
              className="group bg-white border border-neutral-200 hover:border-emerald-300 rounded-lg p-3 transition-all duration-200 flex flex-col justify-between hover:shadow-xs min-w-0"
            >
              <div className="min-w-0">
                {/* Number & Badge Row */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#008751] transition-colors truncate tracking-tight">
                    {hotline.number}
                  </span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-[#008751] border border-emerald-100 shrink-0">
                    {hotline.badge}
                  </span>
                </div>

                {/* Name */}
                <p
                  className="text-xs font-semibold text-neutral-800 mt-2 truncate"
                  title={hotline.name}
                >
                  {hotline.name}
                </p>

                {/* Description */}
                <p
                  className="text-[11px] text-neutral-500 mt-0.5 truncate"
                  title={hotline.description}
                >
                  {hotline.description}
                </p>
              </div>

              {/* Call Action Link */}
              <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-[#008751] opacity-90 group-hover:opacity-100 shrink-0">
                <span>Call Hotline</span>
                <PhoneCall className="w-3 h-3 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

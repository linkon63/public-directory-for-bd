'use client';

import React from 'react';
import { Megaphone, Volume2, ShieldAlert, Sparkles } from 'lucide-react';

export function TopAnnouncementBar() {
  const announcements = [
    {
      tag: 'ই-নামজারি ও ভূমি সেবা',
      text: 'ঘরে বসেই অনলাইনে জমির ই-নামজারি ও খতিয়ান ফি পরিশোধ করুন — ভিজিট করুন land.gov.bd অথবা কল করুন ১৬১২২ নম্বরে।',
    },
    {
      tag: 'জাতীয় জরুরি সেবা ৯৯৯',
      text: 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স সংক্রান্ত যেকোনো জরুরি সহায়তায় ২৪ ঘণ্টা বিনামূল্যে ৯৯৯ এ যোগাযোগ করুন।',
    },
    {
      tag: 'নাগরিক সেবা ও অভিযোগ ৩৩৩',
      text: 'সরকারি তথ্যসেবা ও জেলা প্রশাসনের নিকট নাগরিক অভিযোগ জানাতে ৩৩৩ নম্বরে কল করুন।',
    },
    {
      tag: 'প্রবাসী কল্যাণ ডেস্ক (সিলেট)',
      text: 'প্রবাসী নাগরিকদের জমি ও সম্পদ সুরক্ষায় সিলেট বিভাগীয় কমিশনার ও ডিসি কার্যালয়ে বিশেষ ওয়ান-স্টপ হেল্পডেস্ক কার্যকর রয়েছে।',
    },
    {
      tag: 'নারী ও শিশু হেল্পলাইন ১০৯',
      text: 'নারী ও শিশু নির্যাতন প্রতিরোধ এবং আইনি সহায়তায় টোল-ফ্রি হেল্পলাইন ১০৯ এ কল করুন।',
    },
    {
      tag: 'ডিজিটাল জন্ম নিবন্ধন ও এনআইডি',
      text: 'অনলাইনে জন্ম-মৃত্যু নিবন্ধন ও জাতীয় পরিচয়পত্র (NID) সংশোধন সংক্রান্ত তথ্যের জন্য সরকারি পোর্টালে আবেদন করুন।',
    },
  ];

  return (
    <div className="w-full bg-[#00633b] text-white border-b border-emerald-800/60 overflow-hidden select-none text-xs">
      <div className="w-full flex items-center h-9 sm:h-10 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Left Breaking Badge */}
        <div className="flex items-center gap-1.5 bg-[#00472a] px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-200 border border-emerald-700/50 shrink-0 z-10 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-red-400 animate-pulse" />
          <Megaphone className="w-3.5 h-3.5 text-amber-300" />
          <span className="whitespace-nowrap tracking-tight">নাগরিক বার্তা</span>
        </div>

        {/* Sliding Marquee Container */}
        <div className="flex-1 overflow-hidden relative ml-3">
          <div className="animate-marquee inline-flex items-center gap-8 text-[12px] font-medium text-emerald-50">
            {/* First Set */}
            {announcements.map((item, idx) => (
              <div key={`set1-${idx}`} className="inline-flex items-center gap-2 shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-emerald-800/80 text-emerald-200 text-[10px] font-bold border border-emerald-600/40">
                  {item.tag}
                </span>
                <span className="hover:text-white transition-colors cursor-default">
                  {item.text}
                </span>
                <span className="text-emerald-400/60 mx-2">•</span>
              </div>
            ))}

            {/* Duplicate Set for Seamless Loop */}
            {announcements.map((item, idx) => (
              <div key={`set2-${idx}`} className="inline-flex items-center gap-2 shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-emerald-800/80 text-emerald-200 text-[10px] font-bold border border-emerald-600/40">
                  {item.tag}
                </span>
                <span className="hover:text-white transition-colors cursor-default">
                  {item.text}
                </span>
                <span className="text-emerald-400/60 mx-2">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Help Line Shortcut */}
        <div className="hidden lg:flex items-center gap-2 pl-3 text-[11px] font-bold text-emerald-200/90 shrink-0 border-l border-emerald-700/50">
          <span>হেল্পলাইন:</span>
          <span className="bg-emerald-800/90 text-white px-2 py-0.5 rounded font-mono text-[10px] border border-emerald-600/40">
            ১৬১২২ | ৯৯৯ | ৩৩৩
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { X, MapPin, Search, PhoneCall, ShieldCheck } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  if (!isOpen) return null;

  const steps = [
    {
      icon: MapPin,
      title: '1. Select Your Administrative Area',
      desc: 'Pick your Division, District, Upazila/Thana, and Union or Ward from the four cascading dropdowns.',
    },
    {
      icon: Search,
      title: '2. Switch Between Representatives & Officials',
      desc: 'Toggle tabs to view either your elected representatives (MP, Mayors, Ward Councilors) or administrative government officials (DC, SP, UNO).',
    },
    {
      icon: PhoneCall,
      title: '3. Access Verified Direct Contact Details',
      desc: 'Get official phone numbers, direct government emails, and registered public office locations.',
    },
    {
      icon: ShieldCheck,
      title: '4. Apply for Administrative Assistance',
      desc: 'Need support reaching a public representative? Submit an official citizen request through our verified administration service.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl z-10 border border-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-bold text-neutral-900">How Public Directory Works</h3>
            <p className="text-xs text-neutral-500">Fast, transparent access to local governance</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-150">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008751] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 mb-0.5">{step.title}</h4>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-neutral-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#008751] text-white text-xs font-semibold hover:bg-[#007345]"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}

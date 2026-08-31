'use client';

import React from 'react';
import { Landmark, Shield, Phone, Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#052b1b] text-white border-t border-emerald-900/40 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-800/40">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#008751] border border-emerald-400/30 flex items-center justify-center text-white shadow-md">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight">
                  Public Directory — Sylhet Division
                </span>
                <p className="text-xs text-emerald-200/70">
                  Government &amp; Civic Governance Portal (সিলেট বিভাগ)
                </p>
              </div>
            </div>
            <p className="text-xs text-emerald-100/70 leading-relaxed max-w-sm">
              An open civic directory connecting citizens of Sylhet, Moulvibazar, Sunamganj, and Habiganj with verified contact details of elected representatives and administrative officials.
            </p>
          </div>

          {/* Quick Coverage Districts */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
              Coverage Districts
            </h4>
            <ul className="text-xs text-emerald-100/80 space-y-1.5 font-medium">
              <li>• Sylhet District (১৩টি উপজেলা ও সিসিক)</li>
              <li>• Moulvibazar District (৭টি উপজেলা)</li>
              <li>• Sunamganj District (১২টি উপজেলা ও হাওর)</li>
              <li>• Habiganj District (৯টি উপজেলা)</li>
            </ul>
          </div>

          {/* Emergency Helpline Summary */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
              Citizen Emergency Desks
            </h4>
            <div className="text-xs text-emerald-100/80 space-y-1.5">
              <p>
                <span className="font-bold text-white">National Emergency:</span> 999 (Police, Fire, Ambulance)
              </p>
              <p>
                <span className="font-bold text-white">Citizen Information:</span> 333 (Govt Services)
              </p>
              <p>
                <span className="font-bold text-white">Sylhet Police Control:</span> 01713-374300
              </p>
              <p>
                <span className="font-bold text-white">Land Revenue Helpline:</span> 16122
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
          <div>
            © {new Date().getFullYear()} Public Directory. Verified Civic Data Initiative for Bangladesh.
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Information Sourced from Bangladesh National Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

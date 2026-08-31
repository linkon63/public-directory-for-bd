'use client';

import React, { useState } from 'react';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  Check,
  Copy,
  ExternalLink,
  Calendar,
  Briefcase,
  AlertTriangle,
  Send,
} from 'lucide-react';
import { PersonRecord } from '@/lib/bangladesh-data';

interface OfficerDetailModalProps {
  person: PersonRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestAssistance: (person: PersonRecord) => void;
}

export function OfficerDetailModal({
  person,
  isOpen,
  onClose,
  onRequestAssistance,
}: OfficerDetailModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [reported, setReported] = useState(false);

  if (!isOpen || !person) return null;

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleReport = () => {
    setReported(true);
    setTimeout(() => setReported(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-neutral-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-neutral-100">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.avatar}
              alt={person.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-100 shadow-md"
            />
            {person.verified && (
              <div
                title="Verified Official Record"
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-[#008751] text-white flex items-center justify-center border-2 border-white shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#008751] border border-emerald-100">
                {person.department}
              </span>
              {person.termOrBatch && (
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  {person.termOrBatch}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 leading-tight">
              {person.name}
            </h2>
            <p className="text-xs font-bangla text-neutral-500 font-medium mt-0.5">
              {person.nameBangla}
            </p>

            <p className="text-sm font-bold text-[#008751] mt-1">
              {person.designation}
            </p>
            <p className="text-xs text-neutral-600 font-medium">
              {person.office}
            </p>
          </div>
        </div>

        {/* Quick Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          {/* Phone Box */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-150">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-[#008751] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-neutral-400 font-medium block">Official Telephone</span>
                <a
                  href={`tel:${person.phone}`}
                  className="text-xs font-bold text-neutral-900 hover:text-[#008751] truncate block"
                >
                  {person.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy('phone', person.phone)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/50"
              title="Copy Number"
            >
              {copiedField === 'phone' ? (
                <Check className="w-3.5 h-3.5 text-[#008751]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Email Box */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-150">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-neutral-400 font-medium block">Official Gov Email</span>
                <a
                  href={`mailto:${person.email}`}
                  className="text-xs font-bold text-neutral-900 hover:text-[#008751] truncate block"
                >
                  {person.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy('email', person.email)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/50"
              title="Copy Email"
            >
              {copiedField === 'email' ? (
                <Check className="w-3.5 h-3.5 text-[#008751]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Office Details & Working Hours */}
        <div className="space-y-4 text-xs text-neutral-700 pb-5 border-b border-neutral-100">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Physical Office Location:</span>
              <span>{person.address}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${person.office}, ${person.address}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#008751] hover:underline font-semibold ml-2 text-[11px]"
              >
                Open Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Public Office Hours &amp; Hearings:</span>
              <span>{person.officeHours}</span>
            </div>
          </div>

          {person.jurisdictionNotes && (
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-neutral-900 block">Jurisdiction Scope:</span>
                <span>{person.jurisdictionNotes}</span>
              </div>
            </div>
          )}
        </div>

        {/* Key Citizen Services Handled */}
        <div className="pt-4 pb-5">
          <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#008751]" />
            <span>Key Citizen Services Handled by this Office</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {person.servicesProvided.map((service, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/80 text-[11px] text-neutral-800 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#008751] shrink-0 mt-1.5" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-100">
          <button
            onClick={handleReport}
            className="text-[11px] text-neutral-500 hover:text-red-600 flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{reported ? 'Report Sent to Admin ✓' : 'Report Incorrect Details'}</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${person.phone}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Direct</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onRequestAssistance(person);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#008751] hover:bg-[#007345] text-white text-xs font-bold shadow-md shadow-emerald-800/20 transition-all active:scale-[0.98]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Request Admin Assistance</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

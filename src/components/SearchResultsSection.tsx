'use client';

import React, { useState } from 'react';
import { PersonRecord } from '@/lib/bangladesh-data';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Building,
  Check,
  Copy,
  Info,
} from 'lucide-react';

interface SearchResultsSectionProps {
  results: PersonRecord[];
  searchParams: {
    tab: 'representatives' | 'officials';
    division: string;
    district: string;
    upazila: string;
    union: string;
    query?: string;
  } | null;
  onClear: () => void;
  onSelectOfficer?: (person: PersonRecord) => void;
}

export function SearchResultsSection({
  results,
  searchParams,
  onClear,
  onSelectOfficer,
}: SearchResultsSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!searchParams) return null;

  const handleCopyContact = (id: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-emerald-900/10">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <span>Verified Results</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#008751]">
              {results.length} Found
            </span>
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            {searchParams.tab === 'representatives'
              ? 'Elected Public Representatives'
              : 'Government Administrative Officials'}{' '}
            in {searchParams.division || 'Sylhet Division'}
            {searchParams.district ? ` > ${searchParams.district}` : ''}
            {searchParams.upazila ? ` > ${searchParams.upazila}` : ''}
            {searchParams.query ? ` (Keyword: "${searchParams.query}")` : ''}
          </p>
        </div>

        <button
          onClick={onClear}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
        >
          Clear Results
        </button>
      </div>

      {/* Grid of Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map((person) => (
            <div
              key={person.id}
              onClick={() => onSelectOfficer && onSelectOfficer(person)}
              className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-md shadow-emerald-950/5 hover:border-emerald-200 hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer min-w-0"
            >
              <div className="min-w-0">
                {/* Person Header */}
                <div className="flex items-start gap-3.5 mb-3.5 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-13 h-13 rounded-xl object-cover border border-neutral-100 shadow-xs shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h3 className="text-sm font-bold text-neutral-900 truncate">
                        {person.name}
                      </h3>
                      {person.verified && (
                        <span title="Verified Official" className="shrink-0">
                          <ShieldCheck className="w-4 h-4 text-[#008751]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#008751] mt-0.5 truncate" title={person.designation}>
                      {person.designation}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5" title={person.office}>
                      {person.office}
                    </p>
                  </div>
                </div>

                {/* Info List */}
                <div className="space-y-2 py-3 border-y border-neutral-100 text-xs min-w-0">
                  {/* Address */}
                  <div className="flex items-center gap-2 text-neutral-600 min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate" title={person.address}>
                      {person.address}
                    </span>
                  </div>

                  {/* Phone with copy */}
                  <div className="flex items-center justify-between gap-2 text-neutral-600 min-w-0">
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <a
                        href={`tel:${person.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-neutral-700 hover:text-[#008751] font-medium truncate"
                        title={person.phone}
                      >
                        {person.phone}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleCopyContact(person.id, person.phone, e)}
                      className="text-neutral-400 hover:text-neutral-700 p-1 shrink-0 cursor-pointer rounded hover:bg-neutral-50"
                      title="Copy Phone"
                    >
                      {copiedId === person.id ? (
                        <Check className="w-3 h-3 text-[#008751]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2 text-neutral-600 min-w-0">
                    <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <a
                      href={`mailto:${person.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-neutral-700 hover:text-[#008751] truncate"
                      title={person.email}
                    >
                      {person.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3.5 flex items-center justify-between gap-2 min-w-0">
                {/* Location Tag */}
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-50 text-neutral-500 border border-neutral-150 truncate max-w-[45%] shrink"
                  title={`${person.district} ${person.upazila ? `• ${person.upazila}` : ''}`}
                >
                  {person.district} {person.upazila ? `• ${person.upazila}` : ''}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectOfficer) onSelectOfficer(person);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors shrink-0"
                  >
                    <Info className="w-3 h-3" />
                    <span>Details</span>
                  </button>

                  <a
                    href={`tel:${person.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#008751] hover:bg-[#008751] hover:text-white text-xs font-semibold transition-colors shrink-0"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Direct</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center border border-neutral-100 shadow-sm">
          <Building className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-900">
            No records found for this area
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-4">
            Try selecting a different district or upazila, or request verified officer details through the admin portal.
          </p>
          <button
            onClick={onClear}
            className="px-4 py-2 rounded-lg bg-[#008751] text-white text-xs font-semibold hover:bg-[#007345] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}

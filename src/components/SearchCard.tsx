'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Building,
  Landmark,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { BD_ADMIN_DATA } from '@/lib/bangladesh-data';

interface SearchCardProps {
  onSearch: (params: {
    tab: 'representatives' | 'officials';
    division: string;
    district: string;
    upazila: string;
    union: string;
    query?: string;
  }) => void;
}

const DISTRICT_METADATA: {
  [key: string]: { nameBangla: string; badge: string; icon: string };
} = {
  Sylhet: { nameBangla: 'সিলেট', badge: '১৩টি উপজেলা ও সিসিক', icon: '🏛️' },
  Moulvibazar: { nameBangla: 'মৌলভীবাজার', badge: '৭টি উপজেলা', icon: '🍃' },
  Sunamganj: { nameBangla: 'সুনামগঞ্জ', badge: '১২টি উপজেলা ও হাওর', icon: '🌊' },
  Habiganj: { nameBangla: 'হবিগঞ্জ', badge: '৯টি উপজেলা', icon: '🏭' },
};

export function SearchCard({ onSearch }: SearchCardProps) {
  const [activeTab, setActiveTab] = useState<'representatives' | 'officials'>('representatives');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sylhetDistricts = Object.keys(BD_ADMIN_DATA['Sylhet'] || {});

  const availableUpazilas =
    selectedDistrict && BD_ADMIN_DATA['Sylhet']?.[selectedDistrict]
      ? Object.keys(BD_ADMIN_DATA['Sylhet'][selectedDistrict])
      : [];

  const handleDistrictSelect = (district: string) => {
    const nextDistrict = selectedDistrict === district ? '' : district;
    setSelectedDistrict(nextDistrict);
    setSelectedUpazila(''); // reset upazila

    onSearch({
      tab: activeTab,
      division: 'Sylhet',
      district: nextDistrict,
      upazila: '',
      union: '',
      query: searchQuery,
    });
  };

  const handleUpazilaSelect = (upazila: string) => {
    const nextUpazila = selectedUpazila === upazila ? '' : upazila;
    setSelectedUpazila(nextUpazila);

    onSearch({
      tab: activeTab,
      division: 'Sylhet',
      district: selectedDistrict,
      upazila: nextUpazila,
      union: '',
      query: searchQuery,
    });
  };

  const handleTabChange = (tab: 'representatives' | 'officials') => {
    setActiveTab(tab);
    onSearch({
      tab,
      division: 'Sylhet',
      district: selectedDistrict,
      upazila: selectedUpazila,
      union: '',
      query: searchQuery,
    });
  };

  const handleQueryChange = (val: string) => {
    setSearchQuery(val);
    onSearch({
      tab: activeTab,
      division: 'Sylhet',
      district: selectedDistrict,
      upazila: selectedUpazila,
      union: '',
      query: val,
    });
  };

  const handleReset = () => {
    setSelectedDistrict('');
    setSelectedUpazila('');
    setSearchQuery('');
    onSearch({
      tab: activeTab,
      division: 'Sylhet',
      district: '',
      upazila: '',
      union: '',
      query: '',
    });
  };

  const hasActiveFilters = Boolean(selectedDistrict || selectedUpazila || searchQuery);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 pb-14">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-emerald-950/5 border border-neutral-100">
        {/* Top Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleTabChange('representatives')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'representatives'
                  ? 'bg-[#008751] text-white shadow-md shadow-emerald-800/15'
                  : 'bg-white text-[#008751] border border-neutral-200 hover:border-emerald-300'
              }`}
            >
              Elected Representatives
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('officials')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'officials'
                  ? 'bg-[#008751] text-white shadow-md shadow-emerald-800/15'
                  : 'bg-white text-[#008751] border border-neutral-200 hover:border-emerald-300'
              }`}
            >
              Government Officials
            </button>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-neutral-500 hover:text-red-600 flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-neutral-50 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100 my-6" />

        {/* Quick Instant Search Omnibar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-4 h-4 text-emerald-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Instant Search: Type designation, officer name, or keyword (e.g. DC Sylhet, UNO Beanibazar, SP, Sreemangal, Mayor, AC Land)..."
              className="w-full pl-10 pr-10 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#008751] focus:ring-1 focus:ring-[#008751]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: SELECT DISTRICT (1ST CLICK) */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-neutral-800 tracking-tight">
                Step 1: Select District (১ম ক্লিক: জেলা নির্বাচন করুন)
              </span>
            </div>

            <span className="text-[11px] font-medium text-neutral-400">
              Sylhet Division • সিলেট বিভাগ
            </span>
          </div>

          {/* 4 District Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sylhetDistricts.map((district) => {
              const isSelected = selectedDistrict === district;
              const meta = DISTRICT_METADATA[district] || {
                nameBangla: district,
                badge: '',
                icon: '📍',
              };

              return (
                <button
                  key={district}
                  type="button"
                  onClick={() => handleDistrictSelect(district)}
                  className={`group relative p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#008751] border-[#008751] text-white shadow-md shadow-emerald-800/20 ring-2 ring-emerald-600/20'
                      : 'bg-white border-neutral-200 text-neutral-800 hover:border-emerald-400 hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-sm font-bold truncate ${
                        isSelected ? 'text-white' : 'text-neutral-900 group-hover:text-[#008751]'
                      }`}
                    >
                      {district}
                    </span>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                    ) : (
                      <span className="text-xs opacity-70">{meta.icon}</span>
                    )}
                  </div>

                  <div>
                    <span
                      className={`text-xs font-bangla font-medium block ${
                        isSelected ? 'text-emerald-100' : 'text-neutral-500'
                      }`}
                    >
                      {meta.nameBangla}
                    </span>
                    <span
                      className={`text-[10px] mt-1 inline-block font-semibold px-1.5 py-0.2 rounded ${
                        isSelected
                          ? 'bg-emerald-800 text-emerald-100'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {meta.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 2: SELECT UPAZILA IN DISTRICT (2ND CLICK -> INSTANT RESULTS) */}
        {/* ======================================================== */}
        {selectedDistrict && (
          <div className="mt-6 pt-5 border-t border-neutral-100 animate-fadeIn space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#008751] flex items-center justify-center border border-emerald-100 shrink-0">
                  <Landmark className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-neutral-800">
                  Step 2: Select Upazila in <span className="text-[#008751] font-bold">{selectedDistrict}</span> (২য় ক্লিক: উপজেলা নির্বাচন করুন)
                </span>
              </div>

              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                {availableUpazilas.length} Upazilas Available
              </span>
            </div>

            {/* Upazila Pills Grid */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Shortcut: All District Offices */}
              <button
                type="button"
                onClick={() => handleUpazilaSelect('')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  selectedUpazila === ''
                    ? 'bg-[#008751] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 border border-neutral-200/80'
                }`}
              >
                <span>📍 All {selectedDistrict} (ডিসি, এসপি ও জেলা অফিস)</span>
              </button>

              {/* Individual Upazilas */}
              {availableUpazilas.map((upazila) => {
                const isUpazilaSelected = selectedUpazila === upazila;
                return (
                  <button
                    key={upazila}
                    type="button"
                    onClick={() => handleUpazilaSelect(upazila)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1 ${
                      isUpazilaSelected
                        ? 'bg-[#008751] text-white shadow-xs'
                        : 'bg-white hover:bg-emerald-50/60 text-neutral-700 border border-neutral-200 hover:border-emerald-300'
                    }`}
                  >
                    <span>{upazila}</span>
                    {isUpazilaSelected && <CheckCircle2 className="w-3 h-3 text-emerald-200" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Area Summary Status */}
        {selectedDistrict && (
          <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-neutral-500">Active Area Filter:</span>
              <span className="font-bold text-neutral-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 text-[#008751]">
                Sylhet &gt; {selectedDistrict} {selectedUpazila ? `> ${selectedUpazila}` : ''}
              </span>
            </div>

            <span className="text-[11px] text-emerald-700 font-medium hidden sm:inline">
              ✓ 2-Click Instant Area Filter Active
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

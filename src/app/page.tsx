'use client';

import React, { useState, useEffect } from 'react';
import { TopAnnouncementBar } from '@/components/TopAnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { EmergencyHotlineBar } from '@/components/EmergencyHotlineBar';
import { SearchCard } from '@/components/SearchCard';
import { SearchResultsSection } from '@/components/SearchResultsSection';
import { AdminModal } from '@/components/AdminModal';
import { HowItWorksModal } from '@/components/HowItWorksModal';
import { OfficerDetailModal } from '@/components/OfficerDetailModal';
import { SYLHET_DIRECTORY_DATA, PersonRecord } from '@/lib/bangladesh-data';

export default function Home() {
  const [activeNav, setActiveNav] = useState('home');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [selectedOfficerForModal, setSelectedOfficerForModal] = useState<PersonRecord | null>(null);
  const [officerForAssistance, setOfficerForAssistance] = useState<PersonRecord | null>(null);
  const [adminRequestType, setAdminRequestType] = useState<string | undefined>(undefined);

  const [searchParams, setSearchParams] = useState<{
    tab: 'representatives' | 'officials';
    division: string;
    district: string;
    upazila: string;
    union: string;
    query?: string;
  }>({
    tab: 'representatives',
    division: 'Sylhet',
    district: '',
    upazila: '',
    union: '',
    query: '',
  });

  const [filteredResults, setFilteredResults] = useState<PersonRecord[]>([]);

  // Function to filter records based on criteria
  const runFilter = (params: {
    tab: 'representatives' | 'officials';
    division: string;
    district: string;
    upazila: string;
    union: string;
    query?: string;
  }) => {
    const q = params.query?.trim().toLowerCase() || '';

    const filtered = SYLHET_DIRECTORY_DATA.filter((item) => {
      const matchRole =
        params.tab === 'representatives'
          ? item.roleType === 'representative'
          : item.roleType === 'official';

      const matchDivision = !params.division || item.division === params.division;
      const matchDistrict = !params.district || item.district === params.district;
      const matchUpazila = !params.upazila || item.upazila === params.upazila;
      const matchUnion = !params.union || item.union === params.union;

      let matchQuery = true;
      if (q) {
        matchQuery =
          item.name.toLowerCase().includes(q) ||
          item.nameBangla.includes(q) ||
          item.designation.toLowerCase().includes(q) ||
          item.designationBangla.includes(q) ||
          item.office.toLowerCase().includes(q) ||
          item.district.toLowerCase().includes(q) ||
          (item.upazila?.toLowerCase().includes(q) ?? false);
      }

      return matchRole && matchDivision && matchDistrict && matchUpazila && matchUnion && matchQuery;
    });

    // Fallback: If exact deep filter yields empty but district matches, show district level records
    if (filtered.length === 0 && params.district) {
      const fallback = SYLHET_DIRECTORY_DATA.filter((item) => {
        const matchRole =
          params.tab === 'representatives'
            ? item.roleType === 'representative'
            : item.roleType === 'official';
        return matchRole && item.district === params.district;
      });
      setFilteredResults(fallback.length > 0 ? fallback : filtered);
    } else {
      setFilteredResults(filtered);
    }
  };

  // Initial load
  useEffect(() => {
    runFilter(searchParams);
  }, []);

  const handleSearch = (params: {
    tab: 'representatives' | 'officials';
    division: string;
    district: string;
    upazila: string;
    union: string;
    query?: string;
  }) => {
    setSearchParams(params);
    setActiveNav(params.tab === 'representatives' ? 'representatives' : 'officers');
    runFilter(params);
  };

  const handleClearSearch = () => {
    const reset = {
      tab: searchParams.tab,
      division: 'Sylhet',
      district: '',
      upazila: '',
      union: '',
      query: '',
    };
    setSearchParams(reset);
    runFilter(reset);
  };

  const handleNavTabSwitch = (tab: 'representatives' | 'officials') => {
    const updated = { ...searchParams, tab };
    setSearchParams(updated);
    setActiveNav(tab === 'representatives' ? 'representatives' : 'officers');
    runFilter(updated);

    // Smooth scroll down to directory search section
    const searchSection = document.getElementById('directory-search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenAssistance = (person: PersonRecord) => {
    setOfficerForAssistance(person);
    setAdminRequestType(undefined);
    setIsAdminModalOpen(true);
  };

  const handleOpenAdminWithCategory = (category?: string) => {
    setOfficerForAssistance(null);
    setAdminRequestType(category);
    setIsAdminModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-mint-gradient">
      <div>
        {/* Breaking News Government Service Marquee Ticker */}
        <TopAnnouncementBar />

        {/* Sticky Header Navbar */}
        <Navbar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onOpenAdmin={handleOpenAdminWithCategory}
          onSelectTab={handleNavTabSwitch}
        />

        {/* Hero Section */}
        <HeroSection
          onOpenAdmin={() => handleOpenAdminWithCategory()}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        />

        {/* 24/7 Emergency & Public Helplines Bar */}
        <EmergencyHotlineBar />

        {/* 4-Dropdown Search Card */}
        <SearchCard activeTab={searchParams.tab} onSearch={handleSearch} />

        {/* Dynamic Search Results */}
        <SearchResultsSection
          results={filteredResults}
          searchParams={searchParams}
          onClear={handleClearSearch}
          onSelectOfficer={(person) => setSelectedOfficerForModal(person)}
        />
      </div>

      {/* Admin Application Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        targetOfficer={officerForAssistance}
        initialRequestType={adminRequestType}
        onClose={() => {
          setIsAdminModalOpen(false);
          setOfficerForAssistance(null);
          setAdminRequestType(undefined);
        }}
      />

      {/* How it Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      {/* Officer Full Profile Detail Modal */}
      <OfficerDetailModal
        person={selectedOfficerForModal}
        isOpen={Boolean(selectedOfficerForModal)}
        onClose={() => setSelectedOfficerForModal(null)}
        onRequestAssistance={handleOpenAssistance}
      />
    </div>
  );
}

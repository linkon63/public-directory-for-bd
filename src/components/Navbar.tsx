'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Landmark,
  ArrowRight,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Globe,
  ChevronDown,
  Plane,
  PhoneCall,
  Check,
} from 'lucide-react';
import { SYLHET_EMERGENCY_HOTLINES } from '@/lib/bangladesh-data';

interface NavbarProps {
  onOpenAdmin: (category?: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onSelectTab?: (tab: 'representatives' | 'officials') => void;
}

export function Navbar({ onOpenAdmin, activeNav, setActiveNav, onSelectTab }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyDropdownOpen, setIsEmergencyDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');

  const emergencyRef = useRef<HTMLDivElement>(null);

  // Close emergency dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emergencyRef.current && !emergencyRef.current.contains(event.target as Node)) {
        setIsEmergencyDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: language === 'EN' ? 'Home' : 'হোম', id: 'home' },
    {
      name: language === 'EN' ? 'Public Representatives' : 'জনপ্রতিনিধি',
      id: 'representatives',
      tab: 'representatives' as const,
    },
    {
      name: language === 'EN' ? 'Government Officers' : 'কর্মকর্তাবৃন্দ',
      id: 'officers',
      tab: 'officials' as const,
    },
    {
      name: language === 'EN' ? 'Probashi Desk' : 'প্রবাসী কর্নার',
      id: 'probashi',
      action: () => onOpenAdmin('Expatriate (Probashi) Assistance'),
    },
  ];

  const handleNavItemClick = (item: (typeof navItems)[0]) => {
    setActiveNav(item.id);
    if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.tab) {
      if (onSelectTab) {
        onSelectTab(item.tab);
      }
      const section = document.getElementById('directory-search-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    if (item.action) {
      item.action();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-100/80 shadow-xs">
      {/* Fluid Full-Width Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 h-20 flex items-center justify-between gap-4">
        {/* Left Logo & Brand Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-[#008751] flex items-center justify-center shadow-md shadow-emerald-700/20 text-white shrink-0">
            <Landmark className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg text-neutral-900 tracking-tight whitespace-nowrap">
                Public Directory
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#008751] border border-emerald-200/80 hidden xs:inline-block whitespace-nowrap">
                Sylhet Division
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium hidden sm:block whitespace-nowrap">
              Verified Public Representatives &amp; Civic Administration
            </p>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-7 shrink-0">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item)}
                className={`relative py-2 text-xs 2xl:text-sm transition-colors duration-150 font-medium cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#008751] font-semibold'
                    : 'text-neutral-600 hover:text-[#008751]'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#008751] rounded-full mx-auto" />
                )}
              </button>
            );
          })}

          {/* Emergency Helplines Dropdown Trigger */}
          <div className="relative shrink-0" ref={emergencyRef}>
            <button
              type="button"
              onClick={() => setIsEmergencyDropdownOpen(!isEmergencyDropdownOpen)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-red-50/80 hover:bg-red-100/80 text-red-700 border border-red-200/70 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'EN' ? 'Emergency' : 'জরুরি'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Dropdown Menu */}
            {isEmergencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl p-3 shadow-2xl border border-neutral-100 animate-fadeIn z-50">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100 px-1">
                  <span className="text-xs font-bold text-neutral-900">
                    24/7 Emergency Helplines
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Instant Dial
                  </span>
                </div>

                <div className="mt-2 space-y-1.5">
                  {SYLHET_EMERGENCY_HOTLINES.slice(0, 4).map((hotline, idx) => (
                    <a
                      key={idx}
                      href={`tel:${hotline.number.replace(/[^0-9+]/g, '')}`}
                      onClick={() => setIsEmergencyDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/70 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-neutral-900 group-hover:text-[#008751]">
                          {hotline.number}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate max-w-[170px]">
                          {hotline.name}
                        </p>
                      </div>
                      <PhoneCall className="w-3.5 h-3.5 text-[#008751] opacity-60 group-hover:opacity-100 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Language Toggle & Admin Application Button */}
        <div className="hidden sm:flex items-center gap-2.5 2xl:gap-3.5 shrink-0">
          {/* Language Switcher Button */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-lg border border-neutral-200/80 shrink-0">
            <button
              type="button"
              onClick={() => setLanguage('EN')}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                language === 'EN'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('BN')}
              className={`px-2.5 py-1 rounded text-xs font-bangla font-bold transition-all cursor-pointer ${
                language === 'BN'
                  ? 'bg-[#008751] text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenAdmin()}
            className="flex items-center gap-2 bg-[#008751] hover:bg-[#007345] text-white px-4 2xl:px-5 py-2.5 rounded-lg text-xs 2xl:text-sm font-medium transition-all duration-200 shadow-md shadow-emerald-800/15 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{language === 'EN' ? 'Apply Through Admin' : 'নাগরিক সহায়তা'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile / Tablet Hamburger Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          {/* Mobile Language Switch */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'EN' ? 'BN' : 'EN')}
            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-neutral-200 bg-neutral-50 text-neutral-800"
          >
            {language === 'EN' ? 'বাংলা' : 'EN'}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-neutral-100 bg-white px-4 sm:px-6 py-4 space-y-2.5 shadow-xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavItemClick(item)}
              className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                activeNav === item.id
                  ? 'bg-emerald-50 text-[#008751] font-bold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {item.name}
            </button>
          ))}

          {/* Mobile Emergency Shortcut */}
          <div className="pt-1">
            <a
              href="tel:999"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-red-50 text-red-700 font-bold text-sm border border-red-200/80"
            >
              <span>🚨 {language === 'EN' ? 'National Emergency Helpline' : 'জরুরি সেবা ৯৯৯'}</span>
              <Phone className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#008751] text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-emerald-800/15"
            >
              <span>{language === 'EN' ? 'Apply Through Admin' : 'নাগরিক সহায়তা'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

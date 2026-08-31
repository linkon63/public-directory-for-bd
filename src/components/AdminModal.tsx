'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, CheckCircle, UserCheck, HelpCircle } from 'lucide-react';
import { PersonRecord } from '@/lib/bangladesh-data';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetOfficer?: PersonRecord | null;
  initialRequestType?: string;
}

export function AdminModal({
  isOpen,
  onClose,
  targetOfficer,
  initialRequestType,
}: AdminModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requestType: 'Direct Appointment & Verification',
    area: '',
    officerReferral: '',
    message: '',
  });

  useEffect(() => {
    if (targetOfficer) {
      setFormData((prev) => ({
        ...prev,
        officerReferral: `${targetOfficer.designation} (${targetOfficer.name}) - ${targetOfficer.office}`,
        area: `${targetOfficer.upazila || targetOfficer.district}, ${targetOfficer.division}`,
        requestType: 'Direct Appointment & Verification',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        officerReferral: '',
        area: 'Sylhet Division',
        requestType: initialRequestType || 'Direct Appointment & Verification',
      }));
    }
  }, [targetOfficer, initialRequestType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-neutral-100 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#008751] flex items-center justify-center border border-emerald-100 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-neutral-900">
                Citizen Assistance &amp; Verification Portal
              </h3>
              <p className="text-xs text-neutral-500">
                Official facilitation with public representatives &amp; district offices
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {targetOfficer && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center gap-2.5 text-xs text-neutral-800">
            <UserCheck className="w-4 h-4 text-[#008751] shrink-0" />
            <div>
              <span className="text-[10px] text-[#008751] font-bold block uppercase tracking-wider">
                Assistance Requested For:
              </span>
              <span className="font-bold">{targetOfficer.designation}</span> — {targetOfficer.name} ({targetOfficer.office})
            </div>
          </div>
        )}

        {submitted ? (
          <div className="py-12 text-center space-y-3.5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#008751] flex items-center justify-center mx-auto shadow-md shadow-emerald-700/10">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-neutral-900">
              Application Successfully Logged!
            </h4>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
              Your assistance ticket has been assigned to our Sylhet District Citizen Liaison desk. You will receive an SMS confirmation with tracking ID within 15 minutes.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-mono text-neutral-600">
                Tracking ID: SYL-{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
            <div>
              <label className="block text-neutral-700 font-bold mb-1">
                Your Full Name (আপনার পূর্ণ নাম) *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Tanvir Ahmed Chowdhury"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-[#008751] focus:ring-1 focus:ring-[#008751]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Mobile Number (মোবাইল নম্বর) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 1700-000000"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-[#008751] focus:ring-1 focus:ring-[#008751]"
                />
              </div>
              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Service Request Type *
                </label>
                <select
                  value={formData.requestType}
                  onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-[#008751] focus:ring-1 focus:ring-[#008751]"
                >
                  <option value="Direct Appointment & Verification">Direct Appointment &amp; Verification</option>
                  <option value="Contact Number Confirmation">Contact Number Confirmation</option>
                  <option value="Land Mutation & Mutation Delay">Land Mutation / Revenue Dispute</option>
                  <option value="Expatriate (Probashi) Assistance">Expatriate (Probashi) Help Desk</option>
                  <option value="Citizen Grievance Submission">Citizen Grievance Redressal (GRS)</option>
                  <option value="Official Inquiries">General Official Inquiries</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Email Address (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-[#008751] focus:ring-1 focus:ring-[#008751]"
                />
              </div>
              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Area / Thana / Union *
                </label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="e.g. Sreemangal, Moulvibazar"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-700 font-bold mb-1">
                Details &amp; Reason for Assistance *
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe the official query or service assistance you need with the department..."
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-[#008751]"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#008751] hover:bg-[#007345] text-white font-bold shadow-md shadow-emerald-800/20 active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Assistance Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

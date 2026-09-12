import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Save, User, GraduationCap, Building2, Heart, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SAMPLE_INTEREST_TAGS = [
  'Sustainable Energy', 'Robotics & IoT', 'Digital Arts & Media', 
  'Financial Tech', 'Community Healthcare', 'E-Commerce & Retail', 
  'EdTech & Mentoring', 'Handmade Crafts'
];

export default function Profile() {
  const { profile, setProfile, triggerDemoMode } = useProfile();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const toggleInterestTag = (tag: string) => {
    const current = formData.interests ? formData.interests.split(',').map(s => s.trim()).filter(Boolean) : [];
    const exists = current.includes(tag);
    let next: string[];
    if (exists) {
      next = current.filter(t => t !== tag);
    } else {
      next = [...current, tag];
    }
    setFormData(prev => ({ ...prev, interests: next.join(', ') }));
  };

  const fillSampleProfile = () => {
    setFormData({
      name: 'Aarav Patel',
      role: 'Student',
      schoolOrOrg: 'Delhi Public School, R.K. Puram',
      interests: 'Robotics & IoT, Sustainable Energy, Financial Tech'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate('/skills');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 px-8 py-6 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Student Profile</h2>
              <p className="text-xs text-slate-500">Personalize your skill pathway and entrepreneurship recommendations</p>
            </div>
          </div>

          <button
            type="button"
            onClick={fillSampleProfile}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Auto-fill Sample
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-sm"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                Role
              </label>
              <select
                required
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value as any})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
              >
                <option value="" disabled>Select role</option>
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Teacher">Teacher/Educator</option>
                <option value="Judge">CBSE Judge</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" />
                School / Organization
              </label>
              <input
                type="text"
                required
                value={formData.schoolOrOrg}
                onChange={e => setFormData({...formData, schoolOrOrg: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="e.g. Delhi Public School"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Heart className="w-4 h-4 text-slate-400" />
              Areas of Interest & Curiosity
            </label>
            <textarea
              rows={3}
              value={formData.interests}
              onChange={e => setFormData({...formData, interests: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
              placeholder="What topics, problems, or creative fields are you most curious about?"
            />
            
            {/* Quick Interest Presets */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Tap to toggle interest tags:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_INTEREST_TAGS.map(tag => {
                  const current = formData.interests ? formData.interests.split(',').map(s => s.trim()) : [];
                  const isSelected = current.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleInterestTag(tag)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-300 text-blue-800 font-semibold' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {tag} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {saved ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Profile saved! Navigating to Skills...
                </span>
              ) : (
                <span>Your profile is securely preserved in your local session.</span>
              )}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={triggerDemoMode}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors w-full sm:w-auto"
              >
                Load Full Demo
              </button>
              <button
                type="submit"
                disabled={saved}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors disabled:opacity-50 shadow-sm w-full sm:w-auto"
              >
                <Save className="w-4 h-4" />
                {saved ? 'Saved' : 'Save & Continue'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

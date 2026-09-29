/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 SKILL DATABASE & GRAPH MANAGEMENT
 * Admin CRUD operations, categorization, relationship mapping,
 * assessment & opportunity coverage inspector for every vocational skill.
 */

import React, { useState } from 'react';
import { useKnowledgeBase } from '../../context/KnowledgeBaseContext';
import { useAdmin } from '../../context/AdminContext';
import { useAssessment } from '../../context/AssessmentContext';
import { SkillNode } from '../../data/knowledgeBaseTypes';
import { SkillCategory } from '../../data/skills';
import { 
  Cpu, 
  Search, 
  PlusCircle, 
  Edit3, 
  Archive, 
  Eye, 
  X, 
  Layers, 
  Combine, 
  Briefcase, 
  ShieldCheck, 
  FolderKanban, 
  Compass, 
  CheckCircle2, 
  AlertCircle,
  Save,
  Trash2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminSkills() {
  const { skills, addSkillNode, updateSkillNode, combinations, opportunities, projects, roadmaps } = useKnowledgeBase();
  const { logAdminAction } = useAdmin();
  const { profiles: assessmentProfiles } = useAssessment();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State for Add / Edit
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<SkillCategory>('Technical');
  const [formDesc, setFormDesc] = useState('');
  const [formApplications, setFormApplications] = useState('');
  const [formProblems, setFormProblems] = useState('');
  const [formNextSkills, setFormNextSkills] = useState('');

  const categories: SkillCategory[] = [
    'Technical',
    'Creative',
    'Practical',
    'Entrepreneurial',
    'Communication'
  ];

  const filteredSkills = skills.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setFormId(`skill-${Date.now()}`);
    setFormName('');
    setFormCategory('Technical');
    setFormDesc('');
    setFormApplications('');
    setFormProblems('');
    setFormNextSkills('');
    setIsAddingNew(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (skill: SkillNode) => {
    setFormId(skill.id);
    setFormName(skill.name);
    setFormCategory(skill.category);
    setFormDesc(skill.description);
    setFormApplications(skill.applications.join(', '));
    setFormProblems(skill.problemsSolved.join(', '));
    setFormNextSkills(skill.nextSkills.join(', '));
    setIsEditing(true);
    setIsAddingNew(false);
    setSelectedSkill(skill);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const skillPayload: SkillNode = {
      id: formId,
      name: formName.trim(),
      category: formCategory,
      description: formDesc.trim(),
      applications: formApplications.split(',').map(s => s.trim()).filter(Boolean),
      problemsSolved: formProblems.split(',').map(s => s.trim()).filter(Boolean),
      targetUsers: ['Local Business', 'Student', 'Community'],
      opportunities: [],
      nextSkills: formNextSkills.split(',').map(s => s.trim()).filter(Boolean),
      projectIdeas: [],
      createdAt: new Date().toISOString().substring(0, 10),
      updatedAt: new Date().toISOString().substring(0, 10),
      version: 1,
      origin: 'Curated',
      validationStatus: 'Validated'
    };

    if (isAddingNew) {
      addSkillNode(skillPayload);
      logAdminAction('Added New Skill Record', 'Skill', skillPayload.id, skillPayload.name);
    } else {
      updateSkillNode(skillPayload);
      logAdminAction('Updated Skill Record', 'Skill', skillPayload.id, skillPayload.name);
    }

    setIsAddingNew(false);
    setIsEditing(false);
    setSelectedSkill(skillPayload);
  };

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-black tracking-tight text-white">SKILL DATABASE</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {filteredSkills.length} Skills
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curate competencies, define practical applications, link complementary skills, and track assessment coverage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Skill
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills by title, description..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          <button
            onClick={() => setCategoryFilter('all')}
            className={cn("px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer", categoryFilter === 'all' ? "bg-blue-600 text-white font-bold" : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800")}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn("px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer", categoryFilter === cat ? "bg-blue-600 text-white font-bold" : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => {
          // Check relationships
          const hasAssessment = assessmentProfiles.some(p => p.skillId === skill.id || p.skillName?.toLowerCase() === skill.name.toLowerCase());
          const skillCombos = combinations.filter(c => c.skillIds.includes(skill.id));
          const skillOpps = opportunities.filter(o => o.requiredSkills?.includes(skill.id) || o.relatedSkillIds?.includes(skill.id));
          const skillProjects = projects.filter(p => p.targetSkillIds?.includes(skill.id));

          return (
            <div 
              key={skill.id} 
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                    {skill.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedSkill(skill)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                      title="Inspect Skill Relationships"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(skill)}
                      className="p-1 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800"
                      title="Edit Skill"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{skill.description}</p>
                </div>
              </div>

              {/* Coverage & Relationships Badges */}
              <div className="pt-2 border-t border-slate-900 grid grid-cols-4 gap-1 text-center">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80">
                  <div className="text-[9px] text-slate-500 uppercase font-mono">Combos</div>
                  <div className="text-xs font-bold text-teal-400">{skillCombos.length}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80">
                  <div className="text-[9px] text-slate-500 uppercase font-mono">Opps</div>
                  <div className="text-xs font-bold text-emerald-400">{skillOpps.length}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80">
                  <div className="text-[9px] text-slate-500 uppercase font-mono">Projects</div>
                  <div className="text-xs font-bold text-amber-400">{skillProjects.length}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80">
                  <div className="text-[9px] text-slate-500 uppercase font-mono">Quiz</div>
                  <div className={cn("text-xs font-bold", hasAssessment ? "text-indigo-400" : "text-rose-400")}>
                    {hasAssessment ? 'Ready' : 'Pending'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {(isAddingNew || isEditing) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                {isAddingNew ? 'Add New Skill Node' : `Edit Skill: ${formName}`}
              </h2>
              <button
                onClick={() => { setIsAddingNew(false); setIsEditing(false); }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Skill Identifier (ID):</label>
                <input
                  type="text"
                  value={formId}
                  onChange={(e) => setFormId(e.target.value)}
                  disabled={isEditing}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Skill Name:</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Drone Videography & Mapping"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category:</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as SkillCategory)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Pedagogical Description:</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Core competency scope and learning outcomes..."
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Real-World Applications (Comma separated):</label>
                <textarea
                  rows={2}
                  value={formApplications}
                  onChange={(e) => setFormApplications(e.target.value)}
                  placeholder="e.g., Farm survey mapping, Construction progress documentation"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Problems Solved (Comma separated):</label>
                <textarea
                  rows={2}
                  value={formProblems}
                  onChange={(e) => setFormProblems(e.target.value)}
                  placeholder="e.g., Manual surveying is slow and inaccurate"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsAddingNew(false); setIsEditing(false); }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Skill Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Relationship Inspector Modal */}
      {selectedSkill && !isEditing && !isAddingNew && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-5 h-5 text-blue-400" />
                <div>
                  <h2 className="text-sm font-bold text-white">{selectedSkill.name}</h2>
                  <span className="text-[10px] text-slate-400 font-mono">{selectedSkill.id} • {selectedSkill.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300">
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Description</div>
                <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                  {selectedSkill.description}
                </p>
              </div>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">
                  Practical Applications ({(selectedSkill.applications || []).length})
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-1.5">
                  {(selectedSkill.applications || []).map((app, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-teal-950/60 border border-teal-800 text-teal-300 text-xs">
                      {app}
                    </span>
                  ))}
                  {(!selectedSkill.applications || selectedSkill.applications.length === 0) && (
                    <span className="text-xs text-slate-500 italic">No direct applications listed.</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">
                  Problems Solved ({(selectedSkill.problemsSolved || []).length})
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  {(selectedSkill.problemsSolved || []).map((p, i) => (
                    <div key={i} className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {p}
                    </div>
                  ))}
                  {(!selectedSkill.problemsSolved || selectedSkill.problemsSolved.length === 0) && (
                    <span className="text-xs text-slate-500 italic">No direct problems mapped.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

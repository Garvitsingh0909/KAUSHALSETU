/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { KnowledgeBaseProvider } from './context/KnowledgeBaseContext';
import { ProfileProvider } from './context/ProfileContext';
import { AssessmentProvider } from './context/AssessmentContext';
import { BusinessProvider } from './context/BusinessContext';
import { RoadmapProvider } from './context/RoadmapContext';
import { GOneProvider } from './context/GOneContext';
import { ViewModeProvider } from './context/ViewModeContext';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import SkillDNA from './pages/SkillDNA';
import { SkillAssessment } from './pages/SkillAssessment';
import OpportunityExplorer from './pages/OpportunityExplorer';
import OpportunityDetail from './pages/OpportunityDetail';
import WhatCanIBuild from './pages/WhatCanIBuild';
import CompareOpportunities from './pages/CompareOpportunities';
import { BusinessBuilder } from './pages/BusinessBuilder';
import { MyRoadmap } from './pages/MyRoadmap';
import { MyProjects } from './pages/MyProjects';
import { GOneInsights } from './pages/GOneInsights';
import { SkillToIncomeMap } from './pages/SkillToIncomeMap';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminRouteGuard } from './components/admin/AdminRouteGuard';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminSkills } from './pages/admin/AdminSkills';
import { AdminOpportunities } from './pages/admin/AdminOpportunities';
import { AdminCombinations } from './pages/admin/AdminCombinations';
import { AdminAssessments } from './pages/admin/AdminAssessments';
import { AdminBusinessModels } from './pages/admin/AdminBusinessModels';
import { AdminGOneCenter } from './pages/admin/AdminGOneCenter';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminResearch } from './pages/admin/AdminResearch';
import { AdminFinancialModels } from './pages/admin/AdminFinancialModels';
import { AdminRoadmaps } from './pages/admin/AdminRoadmaps';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminProblems } from './pages/admin/AdminProblems';
import { AdminApplications } from './pages/admin/AdminApplications';
import { AdminExhibition } from './pages/admin/AdminExhibition';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  return (
    <ThemeProvider>
      <KnowledgeBaseProvider>
        <ProfileProvider>
          <AssessmentProvider>
            <BusinessProvider>
              <RoadmapProvider>
                <GOneProvider>
                  <AdminProvider>
                    <ViewModeProvider>
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Layout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="insights" element={<GOneInsights />} />
                            <Route path="skill-to-income" element={<SkillToIncomeMap />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="skills" element={<Skills />} />
                            <Route path="assessment" element={<SkillAssessment />} />
                            <Route path="assessment/:skillId" element={<SkillAssessment />} />
                            <Route path="dna" element={<SkillDNA />} />
                            <Route path="opportunities" element={<OpportunityExplorer />} />
                            <Route path="opportunities/:id" element={<OpportunityDetail />} />
                            <Route path="build" element={<WhatCanIBuild />} />
                            <Route path="compare" element={<CompareOpportunities />} />
                            <Route path="business-builder" element={<BusinessBuilder />} />
                            <Route path="business" element={<BusinessBuilder />} />
                            <Route path="simulator" element={<BusinessBuilder />} />
                            <Route path="roadmap" element={<MyRoadmap />} />
                            <Route path="projects" element={<MyProjects />} />
                          </Route>

                          {/* Admin Routes */}
                          <Route path="/admin" element={
                            <AdminRouteGuard>
                              <AdminLayout />
                            </AdminRouteGuard>
                          }>
                            <Route index element={<AdminOverview />} />
                            <Route path="overview" element={<AdminOverview />} />
                            <Route path="skills" element={<AdminSkills />} />
                            <Route path="opportunities" element={<AdminOpportunities />} />
                            <Route path="combinations" element={<AdminCombinations />} />
                            <Route path="assessments" element={<AdminAssessments />} />
                            <Route path="business-models" element={<AdminBusinessModels />} />
                            <Route path="g-one" element={<AdminGOneCenter />} />
                            <Route path="projects" element={<AdminProjects />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="research" element={<AdminResearch />} />
                            <Route path="financial-models" element={<AdminFinancialModels />} />
                            <Route path="roadmaps" element={<AdminRoadmaps />} />
                            <Route path="customers" element={<AdminCustomers />} />
                            <Route path="problems" element={<AdminProblems />} />
                            <Route path="applications" element={<AdminApplications />} />
                            <Route path="exhibition" element={<AdminExhibition />} />
                            <Route path="settings" element={<AdminSettings />} />
                          </Route>

                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </BrowserRouter>
                    </ViewModeProvider>
                  </AdminProvider>
                </GOneProvider>
              </RoadmapProvider>
            </BusinessProvider>
          </AssessmentProvider>
        </ProfileProvider>
      </KnowledgeBaseProvider>
    </ThemeProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KnowledgeBaseProvider } from './context/KnowledgeBaseContext';
import { ProfileProvider } from './context/ProfileContext';
import { AssessmentProvider } from './context/AssessmentContext';
import { BusinessProvider } from './context/BusinessContext';
import { RoadmapProvider } from './context/RoadmapContext';
import { GOneProvider } from './context/GOneContext';
import { ViewModeProvider } from './context/ViewModeContext';
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

export default function App() {
  return (
    <KnowledgeBaseProvider>
      <ProfileProvider>
        <AssessmentProvider>
          <BusinessProvider>
            <RoadmapProvider>
              <GOneProvider>
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
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </ViewModeProvider>
              </GOneProvider>
            </RoadmapProvider>
          </BusinessProvider>
        </AssessmentProvider>
      </ProfileProvider>
    </KnowledgeBaseProvider>
  );
}

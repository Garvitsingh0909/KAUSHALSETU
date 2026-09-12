/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import { BusinessProvider } from './context/BusinessContext';
import { RoadmapProvider } from './context/RoadmapContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import SkillDNA from './pages/SkillDNA';
import OpportunityExplorer from './pages/OpportunityExplorer';
import OpportunityDetail from './pages/OpportunityDetail';
import WhatCanIBuild from './pages/WhatCanIBuild';
import CompareOpportunities from './pages/CompareOpportunities';
import { BusinessBuilder } from './pages/BusinessBuilder';
import { MyRoadmap } from './pages/MyRoadmap';
import { MyProjects } from './pages/MyProjects';

export default function App() {
  return (
    <ProfileProvider>
      <BusinessProvider>
        <RoadmapProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="skills" element={<Skills />} />
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
        </RoadmapProvider>
      </BusinessProvider>
    </ProfileProvider>
  );
}

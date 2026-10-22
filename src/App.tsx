import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import ParallaxDemo from './demos/default';
import KineticNavDemo from './demos/kinetic-nav';
import Skiper10Demo from './demos/skiper10';
import TimelineDemo from './demos/timeline';
import './styles/index.css';
import './styles/wireframe.css';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Main Portfolio Single-Page Structure with Skiper10 & Parallax Hero */}
            <Route path="/" element={<HomePage />} />

            {/* Standalone Demos */}
            <Route path="/demos/parallax" element={<ParallaxDemo />} />
            <Route path="/demos/kinetic-nav" element={<KineticNavDemo />} />
            <Route path="/demos/skiper10" element={<Skiper10Demo />} />
            <Route path="/demos/timeline" element={<TimelineDemo />} />

            {/* Scalable Subpages / Dynamic Project Routes */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

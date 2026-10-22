import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { ThemeToggle } from '../common/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-container">
      <Navbar />
      <main
        className={`main-content ${!isHomePage ? 'main-content--offset' : ''}`}
        id="main-content"
      >
        {children}
      </main>
      <Footer />
      <ThemeToggle variant="floating" />
    </div>
  );
};

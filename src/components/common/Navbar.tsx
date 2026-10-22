import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationData } from '../../data/navigation';
import { SterlingGateKineticNavigation } from '../ui/sterling-gate-kinetic-navigation';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Map portfolio navigation sections to kinetic navigation items
  const kineticItems = navigationData.map((item, idx) => ({
    label: item.label,
    href: isHomePage ? item.href : `/${item.href}`,
    index: `0${idx + 1}`,
    shape: String((idx % 5) + 1),
  }));

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/#')) {
      navigate(href);
      return;
    }
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <SterlingGateKineticNavigation
      items={kineticItems}
      showOnlyAfterHero={isHomePage}
      brandText="JAYANTH E"
      brandHref={isHomePage ? "#about" : "/"}
      onLinkClick={handleLinkClick}
    />
  );
};

export default Navbar;

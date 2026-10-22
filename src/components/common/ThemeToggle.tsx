import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'floating' | 'navbar' | 'drawer' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'floating',
  className = '',
}) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const isPearl = theme === 'pearl-silver';

  if (variant === 'segmented') {
    return (
      <div
        className={`theme-toggle-segmented ${className}`}
        role="group"
        aria-label="Theme selector"
      >
        <button
          type="button"
          onClick={() => setTheme('pearl-silver')}
          className={`theme-segmented-btn ${isPearl ? 'is-active' : ''}`}
          aria-pressed={isPearl}
        >
          <span className="theme-dot theme-dot--pearl" />
          <span className="theme-btn-label">Pearl Silver</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('black')}
          className={`theme-segmented-btn ${!isPearl ? 'is-active' : ''}`}
          aria-pressed={!isPearl}
        >
          <span className="theme-dot theme-dot--black" />
          <span className="theme-btn-label">Obsidian Black</span>
        </button>
      </div>
    );
  }

  if (variant === 'navbar') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`theme-toggle-navbar ${className}`}
        aria-label={`Switch to ${isPearl ? 'Obsidian Black' : 'Pearl Silver'} theme`}
        title={`Switch to ${isPearl ? 'Obsidian Black' : 'Pearl Silver'} theme`}
      >
        <span className={`theme-dot ${isPearl ? 'theme-dot--pearl' : 'theme-dot--black'}`} />
        <span className="theme-navbar-text">
          {isPearl ? 'Pearl' : 'Black'}
        </span>
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className={`theme-drawer-wrapper ${className}`}>
        <span className="theme-drawer-title">THEME MODE</span>
        <div className="theme-toggle-segmented" role="group" aria-label="Drawer theme selector">
          <button
            type="button"
            onClick={() => setTheme('pearl-silver')}
            className={`theme-segmented-btn ${isPearl ? 'is-active' : ''}`}
            aria-pressed={isPearl}
          >
            <span className="theme-dot theme-dot--pearl" />
            <span className="theme-btn-label">Pearl Silver</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('black')}
            className={`theme-segmented-btn ${!isPearl ? 'is-active' : ''}`}
            aria-pressed={!isPearl}
          >
            <span className="theme-dot theme-dot--black" />
            <span className="theme-btn-label">Obsidian Black</span>
          </button>
        </div>
      </div>
    );
  }

  // Default: Floating luxury pill accessible across all sections & on hero
  return (
    <aside
      className={`theme-toggle-floating-container ${className}`}
      aria-label="Theme switcher"
    >
      <div
        className="theme-toggle-segmented"
        role="group"
        aria-label="Floating theme selector"
      >
        <button
          type="button"
          onClick={() => setTheme('pearl-silver')}
          className={`theme-segmented-btn ${isPearl ? 'is-active' : ''}`}
          aria-pressed={isPearl}
          title="Switch to Pearl Silver theme"
        >
          <span className="theme-dot theme-dot--pearl" />
          <span className="theme-btn-label">Pearl Silver</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('black')}
          className={`theme-segmented-btn ${!isPearl ? 'is-active' : ''}`}
          aria-pressed={!isPearl}
          title="Switch to Obsidian Black theme"
        >
          <span className="theme-dot theme-dot--black" />
          <span className="theme-btn-label">Black</span>
        </button>
      </div>
    </aside>
  );
};

export default ThemeToggle;


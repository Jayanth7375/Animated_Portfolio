import { NavigationItem } from '../types/portfolio';

export const navigationData: NavigationItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'coding-profiles', label: 'Coding Profiles', href: '#coding-profiles' },
  { id: 'certificates', label: 'Certificates', href: '#certificates' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const navActions = {
  resume: {
    label: 'Resume',
    href: '#resume-placeholder',
    isPlaceholder: true,
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/jayanth-e',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jayanth-e',
  },
};


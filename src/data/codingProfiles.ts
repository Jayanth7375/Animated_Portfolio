import { CodingProfileItem } from '../types/portfolio';

export const codingProfilesData: CodingProfileItem[] = [
  {
    id: 'leetcode',
    platform: 'LeetCode',
    logoPlaceholder: '[LOGO: LEETCODE]',
    username: 'jayanth-e',
    profileUrl: 'https://leetcode.com/u/jayanth-e',
    ctaLabel: 'View LeetCode Profile',
    statistics: [
      { label: 'Max Rating', value: '[RATING PLACEHOLDER: e.g. 1750+]' },
      { label: 'Max Streak', value: '[STREAK PLACEHOLDER: e.g. 120 Days]' },
      { label: 'Rank', value: '[GLOBAL RANK PLACEHOLDER: e.g. Top 8%]' },
      { label: 'Problems Solved', value: '[COUNT PLACEHOLDER: 350+]' },
    ],
  },
  {
    id: 'skillrack',
    platform: 'SkillRack',
    logoPlaceholder: '[LOGO: SKILLRACK]',
    username: 'jayanth-e',
    profileUrl: 'https://www.skillrack.com/profile/jayanth-e',
    ctaLabel: 'View SkillRack Profile',
    statistics: [
      { label: 'Problems Solved', value: '[COUNT PLACEHOLDER: 500+]' },
      { label: 'Badges Earned', value: '[BADGES PLACEHOLDER: Gold / Silver]' },
      { label: 'Code Track', value: '[TRACK PLACEHOLDER: Daily Challenge]' },
    ],
  },
  {
    id: 'codechef',
    platform: 'CodeChef',
    logoPlaceholder: '[LOGO: CODECHEF]',
    username: 'jayanth-e',
    profileUrl: 'https://www.codechef.com/users/jayanth-e',
    ctaLabel: 'View CodeChef Profile',
    statistics: [
      { label: 'Problems Solved', value: '[COUNT PLACEHOLDER: 150+]' },
      { label: 'Rating / Stars', value: '[RATING PLACEHOLDER: 2-Star / 3-Star]' },
      { label: 'Division', value: '[DIV PLACEHOLDER: Div 3]' },
    ],
  },
];


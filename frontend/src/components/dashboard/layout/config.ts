import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'Emotions', title: 'Emotions', href: paths.dashboard.emotions, icon: 'emotions' },
  { key: 'Video Search', title: 'Video Search', href: paths.dashboard.vsearch, icon: 'vsearch' },
  { key: 'Book Search', title: 'Book Search', href: paths.dashboard.bsearch, icon: 'bsearch' },
  { key: 'Video Recommendation', title: 'Video Recommendation', href: paths.dashboard.vrecom, icon: 'vrecom' },
  { key: 'Book Recommendation', title: 'Book Recommendation', href: paths.dashboard.brecom, icon: 'brecom' },
] satisfies NavItemConfig[];

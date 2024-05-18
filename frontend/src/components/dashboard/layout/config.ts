import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'Video Search', title: 'Video Search', href: paths.dashboard.vsearch, icon: 'vsearch' },
  { key: 'Book Search', title: 'Book Search', href: paths.dashboard.bsearch, icon: 'bsearch' },
  { key: 'Emotions', title: 'Emotions', href: paths.dashboard.emotions, icon: 'emotions' },
  { key: 'Video Recommendation', title: 'Video Recommendation', href: paths.dashboard.vrecom, icon: 'vrecom' },
  { key: 'Book Recommendation', title: 'Book Recommendation', href: paths.dashboard.brecom, icon: 'brecom' },
  { key: 'My WatchList', title: 'My WatchList', href: paths.home, icon: 'watchlist' },
  { key: 'Upgrade', title: 'Upgrade', href: paths.home, icon: 'upgrade' },
  { key: 'chat', title: 'Chat', href: paths.home, icon: 'chat' },
] satisfies NavItemConfig[];

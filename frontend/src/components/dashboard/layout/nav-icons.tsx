// import type { Icon } from '@phosphor-icons/react/dist/lib/types';
// import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
// import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
// import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
// import { UserFocus} from "@phosphor-icons/react/dist/ssr/UserFocus"
// import { BookBookmark } from "@phosphor-icons/react/dist/ssr/BookBookmark"
// import { Video } from "@phosphor-icons/react/dist/ssr/Video"
// import { YoutubeLogo } from "@phosphor-icons/react/dist/ssr/YoutubeLogo"
// import { Book } from "@phosphor-icons/react/dist/ssr/Book"

// export const navIcons = {
//   'chart-pie': ChartPieIcon,
//   'emotions': UserFocus,
//   'vsearch': YoutubeLogo,
//   'bsearch': Book,
//   'vrecom': Video,
//   'brecom': BookBookmark,
//   user: UserIcon,
//   users: UsersIcon,
  
// } as Record<string, Icon>;


import * as React from 'react'; 
import PieChartIcon from '@mui/icons-material/PieChart';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People'; 
import BookIcon from '@mui/icons-material/Book';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';


export const navIcons = {
  'chart-pie': PieChartIcon,
  'emotions': VideoCameraFrontIcon,
  'vsearch': YouTubeIcon, 
  'bsearch': BookIcon,
  'vrecom': VideoLibraryIcon,
  'brecom': CollectionsBookmarkIcon,
  // 'user': AccountCircleIcon,
  // 'users': PeopleIcon, 
} as Record<string, React.ComponentType>
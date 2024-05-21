import * as React from 'react'; 
import PieChartIcon from '@mui/icons-material/PieChart';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BookIcon from '@mui/icons-material/Book';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarHalfIcon from '@mui/icons-material/StarHalf';
export const navIcons = {
  'chart-pie': PieChartIcon,
  'emotions': VideoCameraFrontIcon,
  'vsearch': YouTubeIcon, 
  'bsearch': BookIcon,
  'vrecom': VideoLibraryIcon,
  'brecom': CollectionsBookmarkIcon,
  'upgrade': UpgradeIcon,
  'feedback': FeedbackIcon,
  'rating': StarHalfIcon,


} as Record<string, React.ComponentType>
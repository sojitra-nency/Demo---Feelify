import * as React from 'react'; 
import PieChartIcon from '@mui/icons-material/PieChart';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
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
} as Record<string, React.ComponentType>
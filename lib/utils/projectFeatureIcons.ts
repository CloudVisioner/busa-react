import type { IconType } from 'react-icons'
import {
  HiOutlineAcademicCap,
  HiOutlineArrowTrendingUp,
  HiOutlineBookOpen,
  HiOutlineBuildingLibrary,
  HiOutlineBuildingStorefront,
  HiOutlineCalendarDays,
  HiOutlineCamera,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckBadge,
  HiOutlineCommandLine,
  HiOutlineGift,
  HiOutlineIdentification,
  HiOutlineLanguage,
  HiOutlineLightBulb,
  HiOutlineMap,
  HiOutlineMicrophone,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlineVideoCamera,
} from 'react-icons/hi2'

/** Maps legacy Material icon names from static data to Heroicons (react-icons/hi2). */
const PROJECT_FEATURE_ICON_MAP: Record<string, IconType> = {
  menu_book: HiOutlineBookOpen,
  forum: HiOutlineChatBubbleLeftRight,
  psychology: HiOutlineSparkles,
  award_star: HiOutlineStar,
  map: HiOutlineMap,
  shield: HiOutlineShieldCheck,
  photo_camera: HiOutlineCamera,
  groups: HiOutlineUserGroup,
  record_voice_over: HiOutlineMicrophone,
  group: HiOutlineUserGroup,
  translate: HiOutlineLanguage,
  support_agent: HiOutlineChatBubbleBottomCenterText,
  temple_buddhist: HiOutlineBuildingLibrary,
  restaurant: HiOutlineBuildingStorefront,
  celebration: HiOutlineGift,
  school: HiOutlineAcademicCap,
  person_search: HiOutlineIdentification,
  verified: HiOutlineCheckBadge,
  terminal: HiOutlineCommandLine,
  trending_up: HiOutlineArrowTrendingUp,
  hub: HiOutlineSquares2X2,
  video_library: HiOutlineVideoCamera,
  event: HiOutlineCalendarDays,
  lightbulb: HiOutlineLightBulb,
}

export function getProjectFeatureIcon(iconName: string): IconType {
  return PROJECT_FEATURE_ICON_MAP[iconName] ?? HiOutlineSparkles
}

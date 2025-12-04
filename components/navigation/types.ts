
import { ViewState } from '../../types';

export interface NavItem {
  label: string;
  href: string;
  type: 'anchor' | 'page';
  view?: ViewState;
}

export interface NavigationColors {
  textColorClass: string;
  navItemClass: string;
  underlineClass: string;
  buttonClass: string;
  dividerClass: string;
  langActive: string;
  langInactive: string;
}

export interface NavProps {
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void;
  handleConfigureClick: () => void;
}

export interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void;
  scrollProgress: number;
  isButtonVisible: boolean;
  onToggleChat: () => void;
}


export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ViewState {
  LANDING = 'LANDING',
  CONFIGURATOR = 'CONFIGURATOR',
  CONTACT = 'CONTACT',
  STRUCTURES = 'STRUCTURES',
  TECHNOLOGY = 'TECHNOLOGY',
  ATMOSPHERE = 'ATMOSPHERE',
  SUSTAINABILITY = 'SUSTAINABILITY',
  CAREERS = 'CAREERS',
  PRESS = 'PRESS',
  ABOUT = 'ABOUT',
  PRIVACY = 'PRIVACY'
}

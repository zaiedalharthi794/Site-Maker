export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export enum SectionType {
  HERO = 'hero',
  FEATURES = 'features',
  ABOUT = 'about',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact',
  GALLERY = 'gallery',
  FAQ = 'faq'
}

export interface SectionContent {
  headline: string;
  subheadline?: string;
  bodyText?: string;
  ctaButtonText?: string;
  items?: Array<{
    title: string;
    description: string;
    iconName?: string; 
  }>;
}

export interface SiteSection {
  type: SectionType;
  content: SectionContent;
}

export interface SitePage {
  title: string;
  slug: string;
  sections: SiteSection[];
}

export interface GeneratedSite {
  siteName: string;
  tagline: string;
  description: string;
  palette: ColorPalette;
  pages: SitePage[];
}
import React, { useState } from 'react';
import { GeneratedSite, SitePage, SiteSection, SectionType } from '../types';
import * as Icons from 'lucide-react';

interface SitePreviewProps {
  site: GeneratedSite;
  onBack: () => void;
}

// Helper to render icons dynamically
const DynamicIcon = ({ name, className, style }: { name?: string; className?: string; style?: React.CSSProperties }) => {
  const IconComponent = (Icons as any)[name || 'Star'] || Icons.Star;
  return <IconComponent className={className} style={style} />;
};

export const SitePreview: React.FC<SitePreviewProps> = ({ site, onBack }) => {
  const [currentPageSlug, setCurrentPageSlug] = useState<string>(site.pages[0]?.slug || '');

  const currentPage = site.pages.find(p => p.slug === currentPageSlug) || site.pages[0];

  const styles = {
    primary: { backgroundColor: site.palette.primary, color: '#fff' },
    secondary: { backgroundColor: site.palette.secondary, color: site.palette.text },
    text: { color: site.palette.text },
    bg: { backgroundColor: site.palette.background },
    accentText: { color: site.palette.accent },
    accentBg: { backgroundColor: site.palette.accent, color: '#fff' },
  };

  const renderSection = (section: SiteSection, index: number) => {
    switch (section.type) {
      case SectionType.HERO:
        return (
          <section key={index} className="relative py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundColor: site.palette.primary }}></div>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-right space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={styles.text}>
                  {section.content.headline}
                </h1>
                <p className="text-xl opacity-80" style={styles.text}>
                  {section.content.subheadline || section.content.bodyText}
                </p>
                {section.content.ctaButtonText && (
                  <button 
                    className="px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all"
                    style={styles.primary}
                  >
                    {section.content.ctaButtonText}
                  </button>
                )}
              </div>
              <div className="flex-1 w-full max-w-md">
                <img 
                  src={`https://picsum.photos/seed/${site.siteName}${index}/600/400`} 
                  alt="Hero" 
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>
          </section>
        );

      case SectionType.FEATURES:
        return (
          <section key={index} className="py-16 px-6" style={styles.bg}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" style={styles.text}>{section.content.headline}</h2>
                <p className="max-w-2xl mx-auto opacity-70" style={styles.text}>{section.content.subheadline}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.content.items?.map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${site.palette.primary}20` }}>
                      <DynamicIcon name={item.iconName} className="w-6 h-6" style={{ color: site.palette.primary }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={styles.text}>{item.title}</h3>
                    <p className="opacity-70 text-sm leading-relaxed" style={styles.text}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case SectionType.ABOUT:
        return (
          <section key={index} className="py-16 px-6 bg-gray-50">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 order-2 md:order-1">
                 <img 
                  src={`https://picsum.photos/seed/about${index}/500/500`} 
                  alt="About" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="flex-1 order-1 md:order-2 space-y-6">
                 <h2 className="text-3xl font-bold" style={styles.text}>{section.content.headline}</h2>
                 <div className="prose prose-lg" style={styles.text}>
                    <p>{section.content.bodyText}</p>
                    <p className="opacity-70">{section.content.subheadline}</p>
                 </div>
              </div>
            </div>
          </section>
        );

      case SectionType.CONTACT:
        return (
          <section key={index} className="py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
              <div className="p-8 md:p-12 flex-1 space-y-6" style={styles.primary}>
                <h2 className="text-3xl font-bold text-white">{section.content.headline}</h2>
                <p className="text-white/80">{section.content.bodyText}</p>
                <div className="space-y-4 pt-4">
                   <div className="flex items-center gap-3 text-white/90">
                      <Icons.Mail className="w-5 h-5" />
                      <span>contact@{site.siteName.toLowerCase().replace(/\s/g, '')}.com</span>
                   </div>
                   <div className="flex items-center gap-3 text-white/90">
                      <Icons.Phone className="w-5 h-5" />
                      <span>+966 50 000 0000</span>
                   </div>
                </div>
              </div>
              <div className="p-8 md:p-12 flex-1 bg-white">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                    <input type="text" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:outline-none transition-all" style={{ '--tw-ring-color': site.palette.primary } as any} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                    <input type="email" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:outline-none transition-all" style={{ '--tw-ring-color': site.palette.primary } as any} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                    <textarea rows={4} className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:outline-none transition-all" style={{ '--tw-ring-color': site.palette.primary } as any}></textarea>
                  </div>
                  <button className="w-full py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: site.palette.accent }}>
                    {section.content.ctaButtonText || "إرسال"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        );
      
      case SectionType.TESTIMONIALS:
        return (
          <section key={index} className="py-16 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12" style={styles.text}>{section.content.headline}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.content.items?.map((item, i) => (
                   <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                     <div className="flex text-yellow-400 mb-4">
                       {[1,2,3,4,5].map(star => <Icons.Star key={star} className="w-4 h-4 fill-current" />)}
                     </div>
                     <p className="italic mb-4 text-gray-600">"{item.description}"</p>
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" />
                       </div>
                       <span className="font-bold text-sm" style={styles.text}>{item.title}</span>
                     </div>
                   </div>
                ))}
              </div>
            </div>
          </section>
        );

      default: // Fallback generic text section
        return (
          <section key={index} className="py-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4" style={styles.text}>{section.content.headline}</h2>
              <p style={styles.text}>{section.content.bodyText}</p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Generated Site Header */}
      <header className="shadow-sm sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={styles.primary}>
              {site.siteName.charAt(0)}
            </div>
            <span className="font-bold text-xl" style={styles.text}>{site.siteName}</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {site.pages.map((page) => (
              <button
                key={page.slug}
                onClick={() => setCurrentPageSlug(page.slug)}
                className={`text-sm font-medium transition-colors hover:text-opacity-80 ${currentPageSlug === page.slug ? 'opacity-100' : 'opacity-60'}`}
                style={{ 
                  color: site.palette.text,
                  borderBottom: currentPageSlug === page.slug ? `2px solid ${site.palette.primary}` : 'none'
                 }}
              >
                {page.title}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <button className="md:hidden">
              <Icons.Menu className="w-6 h-6" style={styles.text} />
            </button>
             {/* Return to builder button */}
            <button 
              onClick={onBack}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-gray-800"
            >
              <Icons.LayoutDashboard className="w-3 h-3" />
              لوحة التحكم
            </button>
          </div>
        </div>
      </header>

      {/* Generated Content Area */}
      <main className="flex-1">
        {currentPage?.sections.map((section, idx) => renderSection(section, idx))}
      </main>

      {/* Generated Footer */}
      <footer className="py-12 px-6 border-t border-gray-100" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
             <h3 className="font-bold text-xl" style={styles.text}>{site.siteName}</h3>
             <p className="text-sm text-gray-500 max-w-xs">{site.description}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={styles.text}>روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {site.pages.map(p => <li key={p.slug}><button onClick={() => setCurrentPageSlug(p.slug)}>{p.title}</button></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={styles.text}>تواصل معنا</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>info@example.com</li>
              <li>+1 234 567 890</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {site.siteName}. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};
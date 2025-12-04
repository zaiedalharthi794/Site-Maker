import React, { useState, useEffect } from 'react';
import { generateWebsite } from './services/geminiService';
import { GeneratedSite } from './types';
import { SitePreview } from './components/SitePreview';
import { Wand2, Loader2, Layout, Globe, CheckCircle2, Lock, CreditCard, User, Mail, Sparkles, BookOpen, Home, LogIn, ChevronLeft, Gamepad2, MonitorPlay, MousePointer2, RefreshCw, Trophy, Phone, Building2, ShoppingBag, FileText, UserCircle, Star } from 'lucide-react';

type AppView = 'HOME' | 'INSTRUCTIONS' | 'REGISTER' | 'LOADING' | 'PAYMENT' | 'PREVIEW' | 'FUN';

// --- Mini Games Components ---

const MiniBuilderGame = () => {
  const [siteColor, setSiteColor] = useState('bg-blue-500');
  const [title, setTitle] = useState('موقعي الرائع');
  const [blocks, setBlocks] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

  const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
  const titles = ['متجر القهوة', 'شركة تقنية', 'مدونة سفر', 'محفظة أعمال', 'مطعم بيتزا'];

  const addBlock = (type: string) => {
    if (blocks.length < 4) setBlocks([...blocks, type]);
    setPublished(false);
  };

  const reset = () => {
    setBlocks([]);
    setPublished(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MonitorPlay className="w-5 h-5 text-indigo-600" />
          بناء موقع مصغر
        </h3>
        <p className="text-sm text-slate-500">جرب شعور بناء موقع بنفسك! اختر الألوان والعناصر وشاهد النتيجة.</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">1. اختر لون الهيدر</label>
            <div className="flex gap-2">
              {colors.map(c => (
                <button 
                  key={c} 
                  onClick={() => setSiteColor(c)} 
                  className={`w-8 h-8 rounded-full ${c} hover:opacity-80 transition-all ring-2 ring-offset-2 ${siteColor === c ? 'ring-slate-400' : 'ring-transparent'}`}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">2. غيّر الاسم</label>
            <button 
              onClick={() => setTitle(titles[Math.floor(Math.random() * titles.length)])}
              className="px-4 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200 transition-colors"
            >
              🎲 اسم عشوائي
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">3. أضف أقسام (بحد أقصى 4)</label>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => addBlock('hero')} className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100">+ غلاف (Hero)</button>
              <button onClick={() => addBlock('text')} className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100">+ نص</button>
              <button onClick={() => addBlock('image')} className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100">+ صورة</button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-3">
             <button 
               onClick={() => setPublished(true)}
               disabled={blocks.length === 0}
               className="flex-1 bg-green-600 text-white py-2 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
             >
               نشر الموقع 🚀
             </button>
             <button onClick={reset} className="px-4 py-2 text-slate-400 hover:text-red-500">
               <RefreshCw className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-slate-800 p-4 rounded-3xl border-4 border-slate-900 shadow-2xl relative min-h-[400px]">
         {/* Mock Browser UI */}
         <div className="bg-white w-full h-full rounded-xl overflow-hidden flex flex-col relative">
            {published && (
              <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center backdrop-blur-sm animate-in fade-in">
                 <div className="bg-white p-6 rounded-2xl text-center shadow-xl transform animate-in zoom-in">
                    <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                    <h4 className="font-bold text-lg">مبروك!</h4>
                    <p className="text-sm text-slate-500">لقد أنشأت موقعك الخاص!</p>
                    <button onClick={() => setPublished(false)} className="mt-4 text-xs underline text-indigo-600">عودة للتعديل</button>
                 </div>
              </div>
            )}
            
            {/* Header */}
            <div className={`${siteColor} p-4 text-white flex justify-between items-center transition-colors duration-300`}>
               <span className="font-bold">{title}</span>
               <div className="flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-white/50"></div>
                 <div className="w-2 h-2 rounded-full bg-white/50"></div>
               </div>
            </div>
            
            {/* Body */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50">
               {blocks.length === 0 && (
                 <div className="h-full flex items-center justify-center text-slate-300 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                   المساحة فارغة... أضف عناصر
                 </div>
               )}
               {blocks.map((type, i) => (
                 <div key={i} className="animate-in slide-in-from-bottom-2 duration-300">
                    {type === 'hero' && (
                      <div className="bg-slate-200 h-24 rounded-lg flex items-center justify-center text-slate-400">صورة الغلاف</div>
                    )}
                    {type === 'text' && (
                      <div className="space-y-2">
                        <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                        <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                      </div>
                    )}
                    {type === 'image' && (
                      <div className="flex gap-2">
                         <div className="flex-1 bg-slate-200 h-16 rounded-lg"></div>
                         <div className="flex-1 bg-slate-200 h-16 rounded-lg"></div>
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </div>
         {/* Phone Notch/Home bar simulation */}
         <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-600 rounded-full"></div>
      </div>
    </div>
  );
};

const FunZone = () => {
  return (
    <div className="w-full max-w-5xl animate-in fade-in duration-500 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900">منطقة المرح 🎮</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          استرح قليلاً من بناء المواقع الحقيقية وجرب بناء موقع مصغر بنفسك.
        </p>
      </div>

      <MiniBuilderGame />
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [view, setView] = useState<AppView>('HOME');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idea: '',
    projectType: 'business'
  });
  
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleTypeSelect = (typeId: string) => {
    setFormData({ ...formData, projectType: typeId });
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idea.trim() || !formData.name || !formData.email) return;

    setView('LOADING');
    setError(null);
    try {
      const fullPrompt = `نوع المشروع: ${formData.projectType}. التفاصيل: ${formData.idea}`;
      const siteData = await generateWebsite(fullPrompt);
      setGeneratedSite(siteData);
      setView('PAYMENT');
    } catch (err) {
      setError("حدث خطأ أثناء توليد الموقع. الرجاء المحاولة مرة أخرى.");
      setView('REGISTER');
    }
  };

  const handlePayment = () => {
    const confirm = window.confirm("هل تود دفع 50$ لفتح الموقع؟ (محاكاة)");
    if (confirm) {
      setView('PREVIEW');
    }
  };

  const handleReset = () => {
    setGeneratedSite(null);
    setFormData({ name: '', email: '', idea: '', projectType: 'business' });
    setView('HOME');
  };

  const projectTypes = [
    { id: 'business', label: 'شركة / أعمال', icon: Building2 },
    { id: 'store', label: 'متجر إلكتروني', icon: ShoppingBag },
    { id: 'blog', label: 'مدونة شخصية', icon: FileText },
    { id: 'portfolio', label: 'ملف إنجاز', icon: UserCircle },
    { id: 'other', label: 'آخر', icon: Layout }
  ];

  // --- Render Functions for Pages ---

  const renderHome = () => (
    <div className="flex flex-col items-center text-center space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto pt-10">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
          ابني موقع أحلامك <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-purple-600">بالذكاء الاصطناعي</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          لا حاجة لخبرة برمجية. فقط أعطنا الفكرة، ونحن نتكفل بالتصميم، المحتوى، والبرمجة في ثوانٍ معدودة.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        <button 
          onClick={() => setView('REGISTER')}
          className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <Wand2 className="w-5 h-5" />
          ابـدأ الآن مجاناً
        </button>
        <button 
          onClick={() => setView('INSTRUCTIONS')}
          className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          كيف يعمل؟
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-10 text-right">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <Layout className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">تصميم احترافي</h3>
          <p className="text-slate-500 text-sm">واجهات عصرية متجاوبة مع جميع الأجهزة تبهر زوارك.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">محتوى ذكي</h3>
          <p className="text-slate-500 text-sm">كتابة نصوص تسويقية مقنعة تناسب نشاطك التجاري تلقائياً.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">جاهز للإطلاق</h3>
          <p className="text-slate-500 text-sm">تحصل على هيكل موقع كامل وجاهز للنشر فوراً.</p>
        </div>
      </div>
    </div>
  );

  const renderInstructions = () => (
    <div className="max-w-3xl mx-auto w-full animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold mb-8 text-center">خطوات إنشاء موقعك</h2>
      <div className="space-y-6">
        {[
          { icon: User, title: "1. التسجيل", desc: "قم بإنشاء حساب سريع في منصتنا لبدء المشروع." },
          { icon: Sparkles, title: "2. الفكرة", desc: "اكتب وصفاً بسيطاً لما تريد. مثلاً: 'موقع لمطعم إيطالي'." },
          { icon: Loader2, title: "3. المعالجة", desc: "يقوم الذكاء الاصطناعي ببناء الهيكل، وكتابة المحتوى، واختيار الصور." },
          { icon: CreditCard, title: "4. الدفع والاستلام", desc: "شاهد النتيجة النهائية، وادفع فقط عندما تكون راضياً لاستلام الكود." }
        ].map((step, idx) => (
          <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
              <step.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">{step.title}</h3>
              <p className="text-slate-500">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button 
          onClick={() => setView('REGISTER')}
          className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          ابدأ رحلتك الآن
        </button>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-in fade-in duration-500">
      
      {/* Left Column: Info & Benefits */}
      <div className="space-y-8 order-2 lg:order-1 pt-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold border border-indigo-100">
            <Sparkles className="w-4 h-4" />
            <span>مدعوم بأحدث تقنيات Gemini 2.5</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            لنحول فكرتك إلى <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-purple-600">واقع رقمي مذهل</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
             انضم لآلاف المستخدمين الذين أنشأوا مواقعهم في دقائق. نضمن لك تصميماً احترافياً ومحتوى إبداعياً يناسب هويتك.
          </p>
        </div>

        {/* Benefits List */}
        <div className="space-y-4">
          {[
            "تصميم متجاوب يعمل على جميع الأجهزة",
            "محتوى عربي احترافي ومخصص",
            "صور عالية الجودة تناسب مجالك",
            "هيكل برمجي نظيف وسريع"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-slate-700 font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* Improved Contact Section */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                 <Phone className="w-6 h-6" />
              </div>
              <div className="text-right">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">هل تحتاج مساعدة؟</p>
                 <p className="text-lg font-bold text-slate-800 dir-ltr">0578545008</p>
              </div>
           </div>
           <button className="text-xs bg-slate-100 px-3 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-200 transition-colors">
             تواصل معنا
           </button>
        </div>
      </div>

      {/* Right Column: Enhanced Form */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 order-1 lg:order-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
        
        <div className="mb-8">
           <h3 className="text-2xl font-bold text-slate-900">بيانات المشروع</h3>
           <p className="text-slate-500 text-sm mt-1">أكمل البيانات التالية لنبدأ في بناء موقعك</p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700">الاسم الكامل</label>
               <div className="relative">
                 <User className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                 <input
                   required
                   name="name"
                   value={formData.name}
                   onChange={handleInputChange}
                   type="text"
                   placeholder="الاسم"
                   className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all"
                 />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
               <div className="relative">
                 <Mail className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                 <input
                   required
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   type="email"
                   placeholder="example@mail.com"
                   className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all"
                 />
               </div>
             </div>
          </div>

          <div className="space-y-3">
             <label className="text-sm font-bold text-slate-700">نوع الموقع</label>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {projectTypes.map(type => (
                 <button
                   type="button"
                   key={type.id}
                   onClick={() => handleTypeSelect(type.id)}
                   className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                     formData.projectType === type.id 
                     ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600' 
                     : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                   }`}
                 >
                    <type.icon className={`w-5 h-5 ${formData.projectType === type.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">{type.label}</span>
                 </button>
               ))}
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold text-slate-700 flex justify-between">
               <span>فكرة الموقع</span>
               <span className="text-xs font-normal text-slate-400 text-left">كن دقيقاً للحصول على أفضل نتيجة</span>
             </label>
             <div className="relative">
                <textarea
                  required
                  name="idea"
                  value={formData.idea}
                  onChange={handleInputChange}
                  placeholder="أريد موقعاً لشركة مقاولات تعرض مشاريعها السابقة وخدمات التصميم الداخلي..."
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none resize-none transition-all text-sm leading-relaxed"
                />
                <div className="absolute bottom-3 left-3">
                   <Sparkles className="w-4 h-4 text-indigo-400 opacity-50" />
                </div>
             </div>
          </div>

          {error && <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div>{error}</div>}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 text-lg group"
          >
            <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            إنشاء الموقع الآن
          </button>
          
          <p className="text-center text-xs text-slate-400 mt-4">
            بالنقر على "إنشاء"، أنت توافق على شروط الخدمة وسياسة الخصوصية.
          </p>
        </form>
      </div>
    </div>
  );

  // --- Main Logic ---

  if (view === 'PREVIEW' && generatedSite) {
    return <SitePreview site={generatedSite} onBack={handleReset} />;
  }

  const isNavVisible = ['HOME', 'INSTRUCTIONS', 'REGISTER', 'FUN'].includes(view);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => isNavVisible && setView('HOME')}>
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-indigo-900">صانع المواقع</span>
          </div>
          
          {isNavVisible && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setView('HOME')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'HOME' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                الرئيسية
              </button>
              <button 
                onClick={() => setView('INSTRUCTIONS')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'INSTRUCTIONS' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                التعليمات
              </button>
              <button 
                onClick={() => setView('FUN')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${view === 'FUN' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Gamepad2 className="w-4 h-4" />
                استمتع
              </button>
              <button 
                onClick={() => setView('REGISTER')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'REGISTER' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                سجل معنا
              </button>
            </nav>
          )}

          <div className="flex items-center gap-2">
             {!isNavVisible && (
               <span className="text-xs font-bold text-slate-400 px-3 py-1 bg-slate-100 rounded-full">
                 {view === 'LOADING' ? 'جاري البناء' : 'مرحلة الدفع'}
               </span>
             )}
             {isNavVisible && view !== 'REGISTER' && (
                <button 
                  onClick={() => setView('REGISTER')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors hidden sm:block"
                >
                  ابدأ الآن
                </button>
             )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 w-full">
        
        {view === 'HOME' && renderHome()}
        {view === 'INSTRUCTIONS' && renderInstructions()}
        {view === 'REGISTER' && renderRegister()}
        {view === 'FUN' && <FunZone />}

        {/* Loading State */}
        {view === 'LOADING' && (
          <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in duration-700">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-indigo-100">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">جاري تصميم موقعك...</h2>
              <p className="text-slate-500">نحن نقوم بتحليل فكرتك وإعداد الصفحات.</p>
            </div>
            <div className="flex gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
              <span>تحليل</span> • <span>كتابة</span> • <span>تصميم</span>
            </div>
          </div>
        )}

        {/* Payment State */}
        {view === 'PAYMENT' && generatedSite && (
          <div className="w-full max-w-md animate-in zoom-in-95 duration-300">
             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100">
                <div className="bg-indigo-600 p-8 text-center text-white relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-y-6 origin-top-left"></div>
                   <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-400 bg-white rounded-full p-1" />
                   <h2 className="text-3xl font-bold relative z-10">الموقع جاهز!</h2>
                   <p className="opacity-90 mt-2 relative z-10">تم تصميم موقع <strong>{generatedSite.siteName}</strong> بنجاح.</p>
                </div>
                
                <div className="p-8 space-y-6">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <span className="text-slate-600">الحالة</span>
                     <span className="font-bold text-green-600 flex items-center gap-1"><Lock className="w-4 h-4"/> مغلق</span>
                   </div>

                   <div className="border-t border-dashed border-slate-200 pt-6 text-center">
                      <div className="text-4xl font-extrabold text-slate-900 mb-6">$50.00</div>
                      <button 
                        onClick={handlePayment}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-5 h-5" />
                        ادفع لفتح الموقع
                      </button>
                   </div>
                   <button onClick={() => setView('REGISTER')} className="w-full text-sm text-slate-400 hover:text-slate-600">
                      إلغاء والعودة
                   </button>
                </div>
             </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-100 mt-auto bg-white">
        <p>© {new Date().getFullYear()} صانع المواقع. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

export default App;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Leaf, ScrollText, Handshake, Sprout, Sun, CloudRain, CloudLightning, CloudSun, Bug, AlertTriangle, TrendingUp, Landmark } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AskSummaryButton } from "./AskSummaryButton";
import { useLanguage } from "@/hooks/useLanguage";

const marketPrices = [
  { name: 'Rice (Paddy)', price: '2,850', unit: 'per Quintal', trend: 'up' },
  { name: 'Wheat', price: '2,100', unit: 'per Quintal', trend: 'down' },
  { name: 'Sugarcane', price: '350', unit: 'per Quintal', trend: 'up' },
  { name: 'Cotton', price: '6,200', unit: 'per Quintal', trend: 'up' },
  { name: 'Turmeric', price: '8,500', unit: 'per Quintal', trend: 'down' },
  { name: 'Onion', price: '1,200', unit: 'per Quintal', trend: 'up' },
  { name: 'Tomato', price: '2,800', unit: 'per Quintal', trend: 'down' },
  { name: 'Potato', price: '1,800', unit: 'per Quintal', trend: 'up' }
];

const schemes = [
  { title: 'PM-KISAN', desc: '₹6,000/year direct benefit for small farmers.' },
  { title: 'Soil Health Card', desc: 'Free soil testing and recommendations.' },
  { title: 'Crop Insurance', desc: 'Low premium insurance for major crops.' },
];

const pestAlerts = [
  { pest: 'Brown Planthopper', crop: 'Paddy', alert: 'High risk in your district. Use neem spray.' },
  { pest: 'Aphids', crop: 'Wheat', alert: 'Monitor for yellowing leaves and sticky residue.' },
];

const weatherAlerts = [
  { type: 'Rainfall', alert: 'Heavy rain expected in next 48h. Delay irrigation.' },
  { type: 'Heatwave', alert: 'Max temp 41°C. Mulch and irrigate early morning.' },
];
function MarketInfoCarousel() {
  const { t } = useLanguage();
  const swiperRef = React.useRef<any>(null);
  // Communicate with ChatbotAssistant via window event
  function sendSummaryToAssistant(summaryEn: string, summaryMl: string, summaryKey: string) {
    window.dispatchEvent(new CustomEvent("ask-assistant-summary", { detail: { summaryEn, summaryMl, summaryKey } }));
  }
  // Summaries for each slide (English and Malayalam)
  const marketSummaryEn =
    "Today's market prices: Most crops are stable. Rice, sugarcane, cotton, and onion prices are rising, which is good for sellers. Wheat, turmeric, and tomato prices are down; consider holding if possible. Check trends before selling for best profit.";
  const marketSummaryMl =
    "ഇന്നത്തെ വിപണി വിലകൾ: ഭൂരിഭാഗം വിളകളും സ്ഥിരമാണ്. അരി, കരിമ്പ്, പത്തിരി, ഉള്ളി എന്നിവയുടെ വില ഉയരുന്നു. ഗോതമ്പ്, മഞ്ഞൾ, തക്കാളി എന്നിവയുടെ വില കുറയുന്നു; കഴിയുന്നെങ്കിൽ വിൽക്കുന്നത് വൈകിക്കുക. മികച്ച ലാഭത്തിനായി പ്രവണത പരിശോധിക്കുക.";
  const schemesSummaryEn =
    "Government schemes available: PM-KISAN provides ₹6,000/year to small farmers. Soil Health Card offers free soil testing. Crop Insurance protects your crops at low premium. Use these benefits to reduce costs and risks.";
  const schemesSummaryMl =
    "സർക്കാർ പദ്ധതികൾ: പി.എം-കിസാൻ ചെറുകൃഷിക്കാർക്ക് വർഷം ₹6,000 നൽകുന്നു. സോയിൽ ഹെൽത്ത് കാർഡ് സൗജന്യ മണ്ണ് പരിശോധന നൽകുന്നു. വിള ഇൻഷുറൻസ് കുറഞ്ഞ പ്രീമിയത്തിൽ സംരക്ഷണം നൽകുന്നു. ഈ പദ്ധതികൾ ഉപയോഗിച്ച് ചെലവ് കുറയ്ക്കുകയും അപകടം കുറയ്ക്കുകയും ചെയ്യാം.";
  const pestSummaryEn =
    "Pest alerts: Brown Planthopper risk is high for paddy—use neem spray. Aphids may affect wheat—watch for yellow leaves. Early action can save your crop and increase yield.";
  const pestSummaryMl =
    " കീട മുന്നറിയിപ്പ്: ബ്രൗൺ പ്ലാൻറ്റോപ്പർ പാടത്തിൽ കൂടുതലാണ്—നീം സ്പ്രേ ഉപയോഗിക്കുക. ആഫിഡ് ഗോതമ്പിൽ ബാധിക്കാം—മഞ്ഞയിലുകൾ ശ്രദ്ധിക്കുക. നേരത്തെ നടപടി വിള സംരക്ഷിക്കും, വിളവെടുപ്പ് വർദ്ധിപ്പിക്കും.";
  const weatherSummaryEn =
    "Weather alerts: Heavy rain expected—delay irrigation. Heatwave coming—mulch and irrigate early. Stay prepared to protect your crops and maximize harvest.";
  const weatherSummaryMl =
    "കാലാവസ്ഥ മുന്നറിയിപ്പ്: ശക്തമായ മഴ പ്രതീക്ഷിക്കുന്നു—നനയ്ക്കൽ വൈകിക്കുക. ചൂട് കൂടുന്നു—മൾച്ച് ചെയ്യുക, രാവിലെ തന്നെ നനയ്ക്കുക. വിള സംരക്ഷിക്കാൻ തയ്യാറാകുക.";
  return (
  <div className="relative pb-10 font-[Poppins,sans-serif]">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        onSwiper={ref => (swiperRef.current = ref)}
        className="w-full"
      >
        {/* Market Prices */}
        {/* Market Prices Slide */}
        <SwiperSlide>
          <div className="relative rounded-2xl p-5 md:p-8 bg-gradient-to-br from-green-100 via-beige-50 to-green-200 dark:from-green-900 dark:via-stone-900 dark:to-green-950 shadow-lg overflow-hidden min-h-[260px] border-2 border-green-200 dark:border-green-800" style={{backgroundImage:'url("/public/leaf-bg.svg")', backgroundRepeat:'no-repeat', backgroundPosition:'right bottom', backgroundSize:'180px'}}>
            <div className="absolute top-4 right-4 z-10">
              <AskSummaryButton onClick={() => sendSummaryToAssistant(marketSummaryEn, marketSummaryMl, 'market')} label={t('askAssistantMarketSummary')} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-green-700 dark:text-green-300" />
              <span className="font-bold text-green-800 dark:text-green-100 text-xl tracking-wide">{t('marketPrices')}</span>
              <Leaf className="ml-2 text-green-400 dark:text-green-700 opacity-60" size={22} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-56 overflow-y-auto pr-1">
              {marketPrices.map((crop, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3 shadow-md bg-white/80 dark:bg-green-950/80 border-2 transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl",
                    crop.trend === 'up' ? 'border-green-300 dark:border-green-700' : 'border-red-200 dark:border-red-700',
                  )}
                  style={{backgroundImage:'url("/public/field-texture.png")', backgroundSize:'cover'}}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-green-900 dark:text-green-100 text-base flex items-center gap-1">
                      <Sprout className="inline text-green-400 dark:text-green-200 mr-1" size={18} />{crop.name}
                    </span>
                    <span className="text-xs text-brown-700 dark:text-green-300">{t('perQuintal')}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg text-brown-900 dark:text-green-100">₹{crop.price}</span>
                    <div className={cn(
                      "text-xs flex items-center gap-1 font-semibold mt-1",
                      crop.trend === 'up' ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-400')}
                    >
                      {crop.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      {crop.trend === 'up' ? '+2.5%' : '-1.8%'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Decorative background icon */}
            <Leaf className="absolute bottom-4 right-4 text-green-200 dark:text-green-900 opacity-30" size={60} />
          </div>
        </SwiperSlide>
        {/* Government Schemes */}
        {/* Schemes Slide */}
        <SwiperSlide>
          <div className="relative rounded-2xl p-5 md:p-8 bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100 dark:from-blue-900 dark:via-yellow-900 dark:to-blue-950 shadow-lg overflow-hidden min-h-[220px] border-2 border-blue-200 dark:border-blue-800">
            <div className="absolute top-4 right-4 z-10">
              <AskSummaryButton onClick={() => sendSummaryToAssistant(schemesSummaryEn, schemesSummaryMl, 'schemes')} label={t('askAssistantSchemesSummary')} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="text-blue-600 dark:text-blue-300" />
              <span className="font-bold text-blue-800 dark:text-blue-100 text-xl tracking-wide">{t('govtSchemes')}</span>
              <ScrollText className="ml-2 text-yellow-400 dark:text-yellow-200 opacity-70" size={22} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {schemes.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl px-4 py-3 bg-white/90 dark:bg-blue-950/80 border-2 border-blue-100 dark:border-blue-700 shadow-md flex flex-col gap-1 transition-all duration-200 hover:shadow-xl hover:border-yellow-300 hover:scale-[1.03]"
                >
                  <span className="font-semibold text-blue-800 dark:text-blue-100 flex items-center gap-1">
                    {i % 2 === 0 ? <Handshake className="text-blue-400 dark:text-blue-200" size={18} /> : <Sprout className="text-green-400 dark:text-green-200" size={18} />}
                    {s.title}
                  </span>
                  <span className="text-xs text-yellow-700 dark:text-yellow-200">{s.desc}</span>
                </div>
              ))}
            </div>
            <ScrollText className="absolute bottom-4 right-4 text-yellow-200 dark:text-yellow-900 opacity-30" size={60} />
          </div>
        </SwiperSlide>
        {/* Pest Alerts */}
        {/* Pest Alerts Slide */}
        <SwiperSlide>
          <div className="relative rounded-2xl p-5 md:p-8 bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 dark:from-yellow-900 dark:via-orange-900 dark:to-yellow-950 shadow-lg overflow-hidden min-h-[220px] border-2 border-orange-200 dark:border-orange-800">
            <div className="absolute top-4 right-4 z-10">
              <AskSummaryButton onClick={() => sendSummaryToAssistant(pestSummaryEn, pestSummaryMl, 'pest')} label={t('askAssistantPestSummary')} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Bug className="text-orange-500 dark:text-orange-300 animate-bounce" />
              <span className="font-bold text-orange-700 dark:text-orange-100 text-xl tracking-wide">{t('pestAlerts')}</span>
              <AlertTriangle className="ml-2 text-orange-400 dark:text-orange-200 opacity-70 animate-pulse" size={22} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pestAlerts.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl px-4 py-3 bg-white/90 dark:bg-orange-950/80 border-2 border-orange-100 dark:border-orange-700 shadow-md flex flex-col gap-1 transition-all duration-200 hover:shadow-xl hover:border-orange-400 hover:scale-[1.03] relative"
                >
                  <span className="font-semibold text-orange-800 dark:text-orange-100 flex items-center gap-1">
                    <Bug className="text-orange-400 dark:text-orange-200" size={18} /> {p.pest} <span className="text-xs text-orange-700 dark:text-orange-200">({p.crop})</span>
                  </span>
                  <span className="text-xs text-orange-700 dark:text-orange-200">{p.alert}</span>
                  {/* Animated urgent icon for first alert */}
                  {i === 0 && <AlertTriangle className="absolute top-2 right-2 text-red-500 dark:text-red-400 animate-pulse" size={18} />}
                </div>
              ))}
            </div>
            <Bug className="absolute bottom-4 right-4 text-orange-200 dark:text-orange-900 opacity-30" size={60} />
          </div>
        </SwiperSlide>
        {/* Weather Alerts */}
        {/* Weather Alerts Slide */}
        <SwiperSlide>
          <div className="relative rounded-2xl p-5 md:p-8 bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-blue-900 dark:via-stone-900 dark:to-blue-950 shadow-lg overflow-hidden min-h-[220px] border-2 border-blue-200 dark:border-blue-800">
            <div className="absolute top-4 right-4 z-10">
              <AskSummaryButton onClick={() => sendSummaryToAssistant(weatherSummaryEn, weatherSummaryMl, 'weather')} label={t('askAssistantWeatherSummary')} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <CloudSun className="text-blue-500 dark:text-blue-300" />
              <span className="font-bold text-blue-700 dark:text-blue-100 text-xl tracking-wide">{t('weatherAlerts')}</span>
              <Sun className="ml-2 text-yellow-300 dark:text-yellow-200 opacity-70 animate-spin-slow" size={22} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weatherAlerts.map((w, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-2xl px-4 py-3 bg-white/90 dark:bg-blue-950/80 border-2 shadow-md flex flex-col gap-1 transition-all duration-200 hover:shadow-xl hover:scale-[1.03] relative",
                    w.type === 'Rainfall' ? 'border-blue-300 dark:border-blue-700' : w.type === 'Heatwave' ? 'border-orange-300 dark:border-orange-700' : 'border-red-300 dark:border-red-700',
                  )}
                >
                  <span className={cn(
                    "font-semibold flex items-center gap-1",
                    w.type === 'Rainfall' ? 'text-blue-700 dark:text-blue-100' : w.type === 'Heatwave' ? 'text-orange-700 dark:text-orange-100' : 'text-red-700 dark:text-red-100',
                  )}>
                    {w.type === 'Rainfall' && <CloudRain className="text-blue-400 dark:text-blue-200" size={18} />}
                    {w.type === 'Heatwave' && <Sun className="text-orange-400 dark:text-orange-200" size={18} />}
                    {w.type === 'Storm' && <CloudLightning className="text-red-400 dark:text-red-200" size={18} />}
                    {w.type}
                  </span>
                  <span className={cn(
                    "text-xs",
                    w.type === 'Rainfall' ? 'text-blue-600 dark:text-blue-200' : w.type === 'Heatwave' ? 'text-orange-600 dark:text-orange-200' : 'text-red-600 dark:text-red-200',
                  )}>{w.alert}</span>
                  {/* Animated background effect for rain/heat */}
                  {w.type === 'Rainfall' && <div className="absolute left-2 bottom-2 animate-raindrop w-2 h-6 bg-blue-200 dark:bg-blue-800 rounded-full opacity-60" />}
                  {w.type === 'Heatwave' && <div className="absolute left-2 bottom-2 animate-sunray w-6 h-2 bg-orange-200 dark:bg-orange-800 rounded-full opacity-60" />}
                </div>
              ))}
            </div>
            <CloudRain className="absolute bottom-4 right-4 text-blue-200 dark:text-blue-900 opacity-30" size={60} />
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Custom navigation arrows at bottom center */}
      <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex gap-4 z-10">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous"
          className="bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 border-green-300 dark:border-green-700 shadow-md rounded-full transition-all duration-200"
          onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
        >
          <ChevronLeft className="w-5 h-5 text-green-700 dark:text-green-200" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next"
          className="bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 border-green-300 dark:border-green-700 shadow-md rounded-full transition-all duration-200"
          onClick={() => swiperRef.current && swiperRef.current.slideNext()}
        >
          <ChevronRight className="w-5 h-5 text-green-700 dark:text-green-200" />
        </Button>
      </div>
    </div>
  );
}

export default MarketInfoCarousel;

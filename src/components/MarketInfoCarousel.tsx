import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { TrendingUp, Landmark, Bug, CloudSun } from "lucide-react";

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
  const swiperRef = React.useRef<any>(null);
  return (
    <div className="relative pb-10">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        onSwiper={ref => (swiperRef.current = ref)}
        className="w-full"
      >
        {/* Market Prices */}
        <SwiperSlide>
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-success" />
              <span className="font-bold text-success text-lg">Latest Market Prices</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {marketPrices.map((crop, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-background/60 rounded border border-success/20">
                  <div>
                    <div className="font-medium text-foreground">{crop.name}</div>
                    <div className="text-xs text-muted-foreground">{crop.unit}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">₹{crop.price}</div>
                    <div className={`text-xs flex items-center gap-1 ${crop.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                      <span>{crop.trend === 'up' ? '↗' : '↘'}</span>
                      {crop.trend === 'up' ? '+2.5%' : '-1.8%'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
        {/* Government Schemes */}
        <SwiperSlide>
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="text-blue-600" />
              <span className="font-bold text-blue-700 text-lg">Govt. Schemes</span>
            </div>
            <div className="space-y-2">
              {schemes.map((s, i) => (
                <div key={i} className="p-3 bg-blue-50/80 rounded border border-blue-200">
                  <div className="font-semibold text-blue-800">{s.title}</div>
                  <div className="text-xs text-blue-700">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
        {/* Pest Alerts */}
        <SwiperSlide>
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Bug className="text-orange-600" />
              <span className="font-bold text-orange-700 text-lg">Pest Alerts</span>
            </div>
            <div className="space-y-2">
              {pestAlerts.map((p, i) => (
                <div key={i} className="p-3 bg-orange-50/80 rounded border border-orange-200">
                  <div className="font-semibold text-orange-800">{p.pest} ({p.crop})</div>
                  <div className="text-xs text-orange-700">{p.alert}</div>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
        {/* Weather Alerts */}
        <SwiperSlide>
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <CloudSun className="text-indigo-600" />
              <span className="font-bold text-indigo-700 text-lg">Weather Alerts</span>
            </div>
            <div className="space-y-2">
              {weatherAlerts.map((w, i) => (
                <div key={i} className="p-3 bg-indigo-50/80 rounded border border-indigo-200">
                  <div className="font-semibold text-indigo-800">{w.type}</div>
                  <div className="text-xs text-indigo-700">{w.alert}</div>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Custom navigation arrows at bottom center */}
      <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex gap-4 z-10">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous"
          onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next"
          onClick={() => swiperRef.current && swiperRef.current.slideNext()}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default MarketInfoCarousel;

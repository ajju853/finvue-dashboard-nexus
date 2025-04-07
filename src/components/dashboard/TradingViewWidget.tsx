
import React, { useEffect, useRef, useState } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  autosize?: boolean;
  interval?: string;
  timezone?: string;
  style?: 'area' | 'bars' | 'candles' | 'line';
  locale?: string;
  height?: number | string;
  backgroundColor?: string;
  gridColor?: string;
  widgetType?: 'chart' | 'ticker' | 'market-overview';
}

export function TradingViewWidget({
  symbol = 'BINANCE:BTCUSDT',
  theme = 'light',
  autosize = true,
  interval = 'D',
  timezone = 'Etc/UTC',
  style = 'candles',
  locale = 'en',
  height = 650,
  backgroundColor = 'rgba(0, 0, 0, 0)',
  gridColor = 'rgba(42, 46, 57, 0.1)',
  widgetType = 'chart',
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [widgetCreated, setWidgetCreated] = useState(false);

  useEffect(() => {
    if (container.current) {
      // Remove any existing widget
      while (container.current.firstChild) {
        container.current.removeChild(container.current.firstChild);
      }

      // Create unique ID for container
      const containerId = `tradingview_${Math.random().toString(36).substring(2, 9)}`;
      container.current.id = containerId;

      const script = document.createElement('script');
      scriptRef.current = script;
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://s3.tradingview.com/tv.js';
      
      script.onload = () => {
        if (window.TradingView && container.current) {
          // Configure the widget based on widget type
          if (widgetType === 'chart') {
            new window.TradingView.widget({
              autosize,
              symbol,
              interval,
              timezone,
              theme,
              style,
              locale,
              toolbar_bg: backgroundColor,
              enable_publishing: false,
              hide_top_toolbar: false,
              hide_side_toolbar: false,
              allow_symbol_change: true,
              save_image: true,
              studies: ["RSI@tv-basicstudies", "MAExp@tv-basicstudies"],
              container_id: containerId,
              height: autosize ? '100%' : height,
              withdateranges: true,
              grid_color: gridColor,
              overrides: {
                "mainSeriesProperties.candleStyle.wickUpColor": '#22c55e',
                "mainSeriesProperties.candleStyle.wickDownColor": '#ef4444',
                "mainSeriesProperties.candleStyle.upColor": '#22c55e',
                "mainSeriesProperties.candleStyle.downColor": '#ef4444',
                "mainSeriesProperties.areaStyle.color1": 'rgba(122, 152, 247, 0.3)',
                "mainSeriesProperties.areaStyle.color2": 'rgba(122, 152, 247, 0.1)',
                "mainSeriesProperties.areaStyle.linecolor": '#7a98f7',
                "mainSeriesProperties.lineStyle.color": '#7a98f7',
              }
            });
          } else if (widgetType === 'ticker') {
            new window.TradingView.widget({
              symbols: [{ s: symbol, d: symbol.split(':').pop() || 'Symbol' }],
              width: "100%",
              height: autosize ? '100%' : height,
              theme,
              locale,
              container_id: containerId,
            });
          } else if (widgetType === 'market-overview') {
            new window.TradingView.widget({
              width: "100%",
              height: autosize ? '100%' : height,
              theme,
              locale,
              container_id: containerId,
              tabs: [
                {
                  title: "Indices",
                  symbols: [
                    { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
                    { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
                    { s: "FOREXCOM:DJI", d: "Dow 30" },
                    { s: "INDEX:NKY", d: "Nikkei 225" },
                    { s: "INDEX:DEU30", d: "DAX Index" },
                    { s: "FOREXCOM:UKXGBP", d: "FTSE 100" }
                  ],
                  originalTitle: "Indices"
                },
                {
                  title: "Commodities",
                  symbols: [
                    { s: "COMEX:GC1!", d: "Gold" },
                    { s: "NYMEX:CL1!", d: "Crude Oil" },
                    { s: "NYMEX:NG1!", d: "Natural Gas" },
                    { s: "CBOT:ZC1!", d: "Corn" }
                  ],
                  originalTitle: "Commodities"
                },
                {
                  title: "Forex",
                  symbols: [
                    { s: "FX:EURUSD", d: "EUR/USD" },
                    { s: "FX:GBPUSD", d: "GBP/USD" },
                    { s: "FX:USDJPY", d: "USD/JPY" },
                    { s: "FX:USDCHF", d: "USD/CHF" },
                    { s: "FX:AUDUSD", d: "AUD/USD" },
                    { s: "FX:USDCAD", d: "USD/CAD" }
                  ],
                  originalTitle: "Forex"
                }
              ]
            });
          }
          
          setWidgetCreated(true);
        }
      };
      
      container.current.appendChild(script);
    }
    
    return () => {
      if (scriptRef.current && container.current?.contains(scriptRef.current)) {
        container.current.removeChild(scriptRef.current);
      }
    };
  }, [symbol, theme, autosize, interval, timezone, style, locale, height, backgroundColor, gridColor, widgetType]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {!widgetCreated && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <div ref={container} className="w-full h-full" />
    </div>
  );
}

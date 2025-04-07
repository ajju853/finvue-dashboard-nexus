
import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  autosize?: boolean;
  interval?: string;
  timezone?: string;
  style?: 'area' | 'bars' | 'candles' | 'line';
  locale?: string;
  height?: number | string;
}

export function TradingViewWidget({
  symbol = 'BINANCE:BTCUSDT',
  theme = 'light',
  autosize = true,
  interval = '15',
  timezone = 'Etc/UTC',
  style = 'area',
  locale = 'en',
  height = 400,
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (container.current) {
      // Remove any existing widget
      while (container.current.firstChild) {
        container.current.removeChild(container.current.firstChild);
      }

      const script = document.createElement('script');
      scriptRef.current = script;
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://s3.tradingview.com/tv.js';
      
      script.onload = () => {
        if (window.TradingView && container.current) {
          new window.TradingView.widget({
            autosize,
            symbol,
            interval,
            timezone,
            theme,
            style,
            locale,
            toolbar_bg: 'rgba(0, 0, 0, 0)',
            enable_publishing: false,
            hide_top_toolbar: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            save_image: false,
            container_id: container.current.id,
            height: autosize ? '100%' : height,
          });
        }
      };
      
      container.current.appendChild(script);
    }
    
    return () => {
      if (scriptRef.current && container.current?.contains(scriptRef.current)) {
        container.current.removeChild(scriptRef.current);
      }
    };
  }, [symbol, theme, autosize, interval, timezone, style, locale, height]);

  return <div id="tradingview_widget" ref={container} className="w-full h-full" />;
}


interface TradingViewWidget {
  widget: (config: {
    autosize?: boolean;
    symbol?: string;
    interval?: string;
    timezone?: string;
    theme?: string;
    style?: string;
    locale?: string;
    toolbar_bg?: string;
    enable_publishing?: boolean;
    hide_top_toolbar?: boolean;
    hide_side_toolbar?: boolean;
    allow_symbol_change?: boolean;
    save_image?: boolean;
    container_id?: string;
    height?: string | number;
    width?: string | number;
    studies?: string[];
    symbols?: { s: string; d: string }[];
    tabs?: { title: string; symbols: { s: string; d: string }[]; originalTitle: string }[];
    withdateranges?: boolean;
    grid_color?: string;
    overrides?: Record<string, string | number>;
  }) => void;
}

declare global {
  interface Window {
    TradingView?: TradingViewWidget;
  }
}

export {};

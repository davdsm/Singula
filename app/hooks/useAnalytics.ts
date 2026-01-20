import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: any;
    _fbq?: any;
    _linkedin_data_partner_ids: string[];
    lintrk: any;
  }
}

// Google Ads conversion tracking
// Use this function on conversion pages (e.g., thank you pages, form submissions)
export const trackGoogleAdsConversion = (value?: number, currency?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-17669266850/Cb60CLLJ9rAbEKK7rulB",
      value: value ?? 1.0,
      currency: currency ?? "EUR",
    });
  }
};

export const useAnalytics = () => {
  useEffect(() => {
    // Google Analytics (G-B178JV87VV) + Google Ads (AW-17669266850)
    const gaId = "G-B178JV87VV";
    const gadsId = "AW-17669266850";
    if (!document.getElementById("google-analytics")) {
      const gaScript = document.createElement("script");
      gaScript.id = "google-analytics";
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gaScript);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
    window.gtag("config", gadsId);

    // Facebook Pixel
    const loadFB = (f: Window, b: Document, e: string, v: string) => {
      if (f.fbq) return;
      const n = (f.fbq = function (...args: any[]) {
        n.callMethod
          ? n.callMethod.apply(n, args)
          : n.queue.push(args);
      }) as any;
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = !0;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s?.parentNode?.insertBefore(t, s);
    };
    loadFB(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("init", "4172016549718352");
    window.fbq("track", "PageView");

    // LinkedIn Pixel
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push("8527905");

    const loadLinkedIn = (l: any) => {
      if (!l) {
        window.lintrk = function (a?: any, b?: any) {
          window.lintrk.q.push([a, b]);
        };
        window.lintrk.q = [];
      }
      const s = document.getElementsByTagName("script")[0];
      const b = document.createElement("script");
      b.type = "text/javascript";
      b.async = true;
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s?.parentNode?.insertBefore(b, s);
    };
    loadLinkedIn(window.lintrk);
  }, []);
};

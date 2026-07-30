"use client";

import { useReportWebVitals } from "next/web-vitals";

type ReportCallback = Parameters<typeof useReportWebVitals>[0];

const reportMetric: ReportCallback = (metric) => {
  const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;

  if (process.env.NODE_ENV === "development") {
    console.info("[Web Vitals]", metric.name, metric.value);
  }

  if (!endpoint) return;

  const body = JSON.stringify({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    pathname: window.location.pathname,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch(endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  });
};

export function WebVitals() {
  useReportWebVitals(reportMetric);
  return null;
}

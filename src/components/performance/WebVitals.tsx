"use client";

import { useReportWebVitals } from "next/web-vitals";

type ReportCallback = Parameters<typeof useReportWebVitals>[0];

function measurementEndpoint() {
  const value = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
  if (!value) return null;

  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

const reportMetric: ReportCallback = (metric) => {
  if (process.env.NODE_ENV === "development") {
    console.info("[Web Vitals]", metric.name, metric.value);
  }

  const endpoint = measurementEndpoint();
  if (!endpoint) return;

  const body = JSON.stringify({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    pathname: window.location.pathname,
  });

  if (navigator.sendBeacon) {
    const accepted = navigator.sendBeacon(
      endpoint,
      new Blob([body], { type: "application/json" }),
    );
    if (accepted) return;
  }

  void fetch(endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    credentials: "omit",
  });
};

export function WebVitals() {
  useReportWebVitals(reportMetric);
  return null;
}

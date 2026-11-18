import React from "react";
import type { Metadata } from "next";
import { AutomationShowcase } from "@/components/AutomationShowcase";

export const metadata: Metadata = {
  title:
    "Industrial Automation Projects (PLC / MES / Vision) | Le Quoc Dat",
  description:
    "End-to-end industrial automation software projects by Le Quoc Dat: real-time PLC/MES telemetry, industrial camera post-processing, and cross-belt sorting control systems.",
};

export default function AutomationPage() {
  return <AutomationShowcase />;
}

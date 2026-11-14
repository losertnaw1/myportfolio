import React from "react";
import type { Metadata } from "next";
import { AutomationShowcase } from "@/components/AutomationShowcase";

export const metadata: Metadata = {
  title:
    "Dự án Tự động hóa (PLC / MES / Vision) | Lê Quốc Đạt — Software Engineer",
  description:
    "Chi tiết các dự án Tự động hóa công nghiệp, kết nối PLC/MES, tích hợp Camera công nghiệp và hệ thống phân loại Cross-Belt Sorting của Lê Quốc Đạt.",
};

export default function AutomationPage() {
  return <AutomationShowcase />;
}


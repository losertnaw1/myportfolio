import React from "react";
import type { Metadata } from "next";
import { SideProjectsShowcase } from "@/components/SideProjectsShowcase";

export const metadata: Metadata = {
  title: "Side Projects (Lucinox & Miner's Haven) | Lê Quốc Đạt",
  description:
    "Các dự án cá nhân của Lê Quốc Đạt: Lucinox — thư viện mẫu website hiện đại với demo trực tiếp, và Miner's Haven — game tycoon khai thác mỏ trên Roblox.",
};

export default function SideProjectsPage() {
  return <SideProjectsShowcase />;
}

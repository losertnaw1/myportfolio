import React from "react";
import type { Metadata } from "next";
import { SideProjectsShowcase } from "@/components/SideProjectsShowcase";

export const metadata: Metadata = {
  title: "Side Projects (Lucinox & Miner's Haven) | Le Quoc Dat",
  description:
    "Personal projects built by Le Quoc Dat: Lucinox — a modern website template gallery with live demos, and Miner's Haven — a Roblox mining tycoon game.",
};

export default function SideProjectsPage() {
  return <SideProjectsShowcase />;
}

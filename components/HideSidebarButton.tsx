"use client";
import React from "react";
import { EyeIcon } from "./ui/EyeIcon";
import { useStore } from "@/lib/store";

export const HideSidebarButton = () => {
  const setShowLeftDrawer = useStore((state) => state.setShowLeftDrawer);
  return (
    <div
      className="pb-12 pl-8 flex gap-4 items-center hover:cursor-pointer"
      onClick={() => setShowLeftDrawer(false)}
    >
      <EyeIcon />
      <span className="font-bold text-mediumgrey text-custom">
        Hide Sidebar
      </span>
    </div>
  );
};

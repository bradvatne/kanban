"use client";
import React from "react";
import { useStore } from "@/lib/store";
import { Icons } from "./ui/Icons";

export const HideSidebarButton = () => {
  const setShowLeftDrawer = useStore((state) => state.setShowLeftDrawer);
  return (
    <div
      className="pb-12 pl-8 flex gap-4 items-center hover:cursor-pointer"
      onClick={() => setShowLeftDrawer(false)}
    >
      <Icons.closedEye />
      <span className="font-bold text-mediumgrey text-custom">
        Hide Sidebar
      </span>
    </div>
  );
};

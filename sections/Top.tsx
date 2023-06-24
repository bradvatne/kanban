import React from "react";
import { Logo } from "@/components/ui/Logo";
import { CurrentBoard } from "@/components/CurrentBoard";
import { AddTaskButton } from "@/components/AddTaskButton";
import { ThreeDotButton } from "@/components/ui/ThreeDotButton";

const Top = () => {
  return (
    <div className="flex h-[6rem] w-full">
      <div className="pl-[4.5rem] pr-[7rem] pt-[2rem] w-[300px] border-r border-lightlines dark:border-darklines">
        <Logo />
      </div>
      <div className="flex items-center justify-between w-full px-6">
        <CurrentBoard />
        <div className="flex gap-[1.5rem] items-center">
          <AddTaskButton />
          <ThreeDotButton />
        </div>
      </div>
    </div>
  );
};

export default Top;

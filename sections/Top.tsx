import React from "react";
import { Logo } from "@/components/ui/Logo";
import { CurrentBoard } from "@/components/CurrentBoard";
import { AddTaskButton } from "@/components/AddTaskButton";
import { ThreeDotButton } from "@/components/ui/ThreeDotButton";

const Top = () => {
  return (
    <div className="flex h-[6rem] w-full">
      <div className="pl-[4.5rem] pr-[7rem] pt-6 w-[300px] border-r border-lightlines dark:border-darklines">
        <Logo />
      </div>
      <div className="flex items-center justify-between w-full">
        <CurrentBoard />
        <div className="flex">
          <AddTaskButton />
          <ThreeDotButton />
        </div>
      </div>
    </div>
  );
};

export default Top;

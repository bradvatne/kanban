import Top from "@/sections/Top";
import { Left } from "@/sections/Left";
import { Right } from "@/sections/Right";
import { Modals } from "@/components/Modals";

export default async function Index() {
  return (
    <div className="dark:bg-black h-full">
      <Modals />
      <Top />
      <div className="flex">
        <Left />
        <Right />
      </div>
    </div>
  );
}

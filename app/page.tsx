import Top from "@/sections/Top";
import { Left } from "@/sections/Left";
import { Right } from "@/sections/Right";
import { Modals } from "@/components/Modals";

export default async function Index() {
  return (
    <div className="h-full relative">
      <Modals />
      <Top />
      <div className="flex test">
        <Left />
        <Right />
      </div>
    </div>
  );
}

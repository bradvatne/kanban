import Top from "@/sections/Top";
import { Left } from "@/sections/Left";
import { Right } from "@/sections/Right";
import { Modals } from "@/components/Modals";

export default async function Index() {
  return (
    <div className="h-full">
      <Modals />
      <Top />
      <div className="flex h-full">
        <Left />
        <Right />
      </div>
    </div>
  );
}


import Top from "@/sections/Top";
import { Left } from "@/sections/Left";
import { Right } from "@/sections/Right";

export default async function Index() {
  return (
    <div className="dark:bg-black h-full">
      <Top />
      <div className="flex">
        <Left />
        <Right />
      </div>
    </div>
  );
}

import { lightContentGridColor, lightFrameGridColor } from "../lib/grid_view";
import { iADuo } from "./fonts";

export default function FrameContent({
  leftBar,
  rightBar,
  showFrame = false,
  showContentFrame = false,
  children,
}) {
  const lightFrame = showFrame ? "bg-red-100" : "";
  const darkFrame = showFrame ? "bg-red-300" : "";
  const contentFrame = showContentFrame ? "bg-violet-100" : "";

  return (
    <div className="flex grow flex-row">
      <div
        className={`flex-none w-[48px] pl-[16px] ${lightFrameGridColor} flex flex-row-reverse`}
      >
        <div className="flex grow"></div>
        <div
          className={`${iADuo.className} flex-none rotate-180 whitespace-nowrap font-extralight text-slate-400 m-[0px] pb-[20vh] text-right`}
          style={{ writingMode: "vertical-rl" }}
        >
          {leftBar}
        </div>
        <div className="flex grow"></div>
      </div>
      <div className={`flex-initial grow ${lightContentGridColor}`}>
        <div className="h-full">{children}</div>
      </div>
      <div
        className={`flex-none w-[48px] ${lightFrameGridColor} flex flex-row`}
      >
        <div className="flex grow"></div>
        <div
          className={`${iADuo.className} flex-none pr-[16px] whitespace-nowrap font-extralight text-slate-400 pt-[20vh] text-left`}
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="slashed-zero">{rightBar}</span>
        </div>
        <div className="flex grow"></div>
      </div>
    </div>
  );
}

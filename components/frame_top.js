import SectionLink from "./section_link";
import { lightFrameGridColor, darkFrameGridColor } from "../lib/grid_view";
import { iADuo } from "./fonts";

export default function FrameTop({ siteMenu, siteName, showFrame = false }) {
  return (
    <div className="flex-none h-[64px] flex flex-row">
      <div className={`flex-none w-[48px] ${darkFrameGridColor}`}></div>
      <div
        className={`flex-initial grow ${lightFrameGridColor} flex flex-col-reverse`}
      >
        <div>
          <div
            className={`${iADuo.className} w-50 py-[4px] float-left font-regular text-3xl`}
          >
            <SectionLink href="/">{siteName}</SectionLink>
          </div>
          <div className={`${iADuo.className} w-50 float-right text-2xl`}>
            <ul className="list divide-x">
              {siteMenu.map((entry) => (
                <li
                  key={entry[1]}
                  className="inline-block px-[8px] last:pr-0 py-[4px]"
                >
                  <SectionLink href={entry[1]}>{entry[0]}</SectionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={`flex-none w-[48px] ${darkFrameGridColor}`}></div>
    </div>
  );
}

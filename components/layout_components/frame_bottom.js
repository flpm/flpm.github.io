import Link from "next/link";
import SectionLink from "../sections/section_link";
import { lightFrameGridColor, darkFrameGridColor } from "../../lib/grid_view";
import { iADuo } from "../utils/fonts";

export default function FrameBottom({
  contactPage,
  siteLinks,
  showFrame = false,
}) {
  return (
    <div className="flex-none h-[80px] flex flex-row">
      <div className={`flex-none w-[48px] ${darkFrameGridColor}`}></div>
      <div className={`flex-initial grow ${lightFrameGridColor}`}>
        <div>
          <div className={`${iADuo.className} w-50 float-left text-2xl`}>
            <SectionLink href={contactPage[1]}>{contactPage[0]}</SectionLink>
          </div>
          <div className={`${iADuo.className} w-50 float-right text-2xl`}>
            <ul className="list list-disc divide-x">
              {siteLinks.map((i) => (
                <li key={i[0]} className={"inline-block px-[8px] py-[4px]"}>
                  <Link className="hover:underline" key={i[0]} href={i[1]}>
                    {i[0]}
                  </Link>
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

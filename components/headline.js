import { openSans } from "./utils/fonts";

export default function Headline({
  title,
  subtitle,
  titleSize = "6xl",
  subtitleSize = "5xl",
}) {
  return (
    <div
      className={`${openSans.className} text-${titleSize} font-semibold pb-12`}
    >
      {title}
      <div
        className={`${openSans.className} text-${subtitleSize} pt-4 font-light`}
      >
        {subtitle}
      </div>
    </div>
  );
}

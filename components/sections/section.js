import { gridWidth, darkContentGridColor } from "../../lib/grid_view";
import Spacer from "./spacer";

export default function Section({
  spaceBefore = 0,
  columns = 1,
  spaceAfter = 0,
  className = "",
  children,
}) {
  if (columns === 0) return null;
  if (columns < 1 || columns > gridWidth)
    throw new Error(`Number of columns must be between 0 and ${gridWidth}.`);
  return (
    <>
      {spaceBefore !== 0 ? (
        <Spacer columns={spaceBefore} className={darkContentGridColor} />
      ) : null}
      <div
        className={`col-span-${columns} ${darkContentGridColor} ${className}`}
      >
        {children}
      </div>
      {spaceAfter !== 0 ? (
        <Spacer columns={spaceAfter} className={darkContentGridColor} />
      ) : null}
    </>
  );
}

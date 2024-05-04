import { gridWidth, darkContentGridColor } from "../../lib/grid_view";

export default function Spacer({ columns = 1, className = "" }) {
  if (columns === 0) return null;
  if (columns < 1 || columns > gridWidth)
    throw new Error(`Number of columns must be between 0 and ${gridWidth}.`);
  return (
    <div
      className={`col-span-${columns} ${darkContentGridColor} ${className}`}
    ></div>
  );
}

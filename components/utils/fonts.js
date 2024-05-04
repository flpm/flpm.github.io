import { Open_Sans, Trispace } from "next/font/google";
import LocalFont from "next/font/local";

export const iADuoItalic = LocalFont({
  src: "../../fonts/iAWriterDuoV-Italic.ttf",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const iADuo = LocalFont({
  src: "../../fonts/iAWriterDuoV.ttf",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const trispace = Trispace({ subsets: ["latin"], axes: ["wdth"] });

export const openSans = Open_Sans({ subsets: ["latin"] });

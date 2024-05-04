/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "col-span-1",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-5",
    "col-span-6",
    "col-span-7",
    "col-span-8",
    "col-span-9",
    "col-span-10",
    "col-span-11",
    "text-8xl",
    "text-7xl",
  ],
  theme: {
    extend: {
      fontSize: {
        "2kk": [
          "4rem",
          {
            lineHeight: "8rem",
            //letterSpacing: "-0.01em",
            fontWeight: "500",
          },
        ],
        "3kk": [
          "1.875rem",
          {
            lineHeight: "2.25rem",
            //letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
      },
    },
  },
  plugins: [],
};

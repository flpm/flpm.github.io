/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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

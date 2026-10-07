/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      keyframes: {
        // Animates opacity only (not box-shadow): box-shadow forces a repaint every
        // frame, forever, even while the badge is scrolled off-screen. Opacity is
        // compositor-only, so this costs essentially nothing no matter how long it runs.
        "logo-glow": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "0.65" },
        },
      },
      animation: {
        "logo-glow": "logo-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

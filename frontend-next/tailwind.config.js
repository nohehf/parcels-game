module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#D0D2BE",
      },
      fontFamily: {
        unifraktur: ["UnifrakturCook", "normal"],
        almendra: ["Almendra"],
      },
    },
    rotate: {
      0: "0deg",
      90: "90deg",
      180: "180deg",
      270: "270deg",
      360: "0deg",
    },
  },
  plugins: [],
};

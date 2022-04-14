module.exports = {
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: "5%",
        sm: "32px",
        "2xl": "144px",
      },
      center: true,
    },
    extend: {
      lineHeight: {
        inherit: "inherit",
        18: "4rem",
      },
      colors: {
        primary: "#304659",
        info: "#2DA7FB",
        warning: "#FFCB11",
        danger: "#ec4141",
        success: "#67db8e",
        orange: "#FF804C",
      },
      spacing: {
        100: "25rem",
        118: "29.5rem",
        200: "50rem",
      },
      fontFamily: {
        main: "Plus Jakarta Sans, sans-serif",
      },
      fontSize: {
        "3.5xl": "32px",
        "4.5xl": "42px",
        "5.5xl": "52px",
      },
      height: {
        22: "90px",
        125: "500px",
        150: "600px",
        170: "680px",
        200: "800px",
        225: "900px",
        245: "980px",
      },
      width: {
        22: "90px",
      },
      minHeight: {
        125: "500px",
        150: "600px",
        170: "680px",
      },
      maxHeight: {
        120: "300px",
        125: "500px",
      },
      screens: {
        "-2xl": { raw: "(max-width: 1535px)" },
        "-xl": { raw: "(max-width: 1279px)" },
        "-lg": { raw: "(max-width: 1023px)" },
        "-md": { raw: "(max-width: 767px)" },
        "-sm": { raw: "(max-width: 639px)" },
        "-xs": { raw: "(max-width: 479px)" },
      },
      zIndex: {
        100: "100",
        250: "250",
        500: "500",
      },
      animation: {
        fadeout: "fadeOut 0.4s ease-in-out",
        fadein: "fadeIn 0.4s ease-in-out",
      },
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { backgroundColor: "rgba(0, 0, 0, 0.4)" },
          "100%": { backgroundColor: theme("colors.transparent") },
        },
        fadeIn: {
          "0%": { backgroundColor: theme("colors.transparent") },
          "100%": { backgroundColor: "rgba(0, 0, 0, 0.4)" },
        },
      }),
    },
  },
  variants: {
    extend: {
      margin: ["last"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};

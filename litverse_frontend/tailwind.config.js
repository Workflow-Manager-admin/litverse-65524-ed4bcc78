module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#011d03", // For backgrounds and strong elements
        },
        secondary: {
          DEFAULT: "#4b5563", // Tailwind's gray-600
        },
        accent: {
          DEFAULT: "#facc15", // Tailwind's yellow-400
        },
        // Additional grays (for dark bg support)
        darkBg: "#18181b",
        darkCard: "#232329"
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        modern: "0 4px 24px 0 rgba(1,29,3,0.06),0 1.5px 4px 0 rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

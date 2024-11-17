import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#28194b',
        // primary: '#7D49F8',
      }
    }
  },
  plugins: [aspectRatio],
};



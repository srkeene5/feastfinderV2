/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //"./src/**/*.{js,ts,jsx,tsx}",
    "./src/frontend/**/*.{js, ts, jsx, tsx}",
    "./src/frontend/screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ffBackground': '#f6f6f6',
        'ffCard': '#ffffff',
        'ffEdge': '#dddddd',
        'ffHeading': '#111827',
        'ffBody': '#6b7280',
        'ffText': '#000000',
        'ffRedL': '#b51536',
        'ffGreenL': '#079373',
        'ffGreyL': '#8c8c9c',
        'ffRedD': '#73142e',
        'ffGreenD': '#184941',
        'ffGreyD': '#41545b',
      }
    },
  },
  plugins: [],
  
  
};


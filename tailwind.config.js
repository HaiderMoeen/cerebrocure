/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F1330',
        bg2: '#151A42',
        surface: '#1A2050',
        surface2: '#222A63',
        text: '#EEF1FF',
        muted: '#AAB4E3',
        line: 'rgba(238,241,255,0.16)',
        pink: '#EE4F7F',
        soft: '#FFB5C9',
        'on-accent': '#0A1033',
        glow: 'rgba(238,79,127,0.22)',
        // Region accents
        'region-global': '#EE4F7F',
        'region-europe': '#7C9BFF',
        'region-mideast': '#FFC26B',
        'region-pk': '#B892FF',
        'region-apac': '#FF8A65',
      },
      fontFamily: {
        display: ['"Montserrat"', '"Avenir Next"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        body: ['"Montserrat"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '40px',
      },
      boxShadow: {
        'btn-pink': '0 10px 30px -8px rgba(238, 79, 127, 0.5)',
        'mission-glow': '0 -30px 80px -40px rgba(238, 79, 127, 0.4)',
        'demo-frame': '0 60px 120px -40px rgba(0,0,0,0.6), 0 0 0 1px rgba(238,79,127,0.25), 0 0 90px -20px rgba(238,79,127,0.22)',
      },
    },
  },
  plugins: [],
};

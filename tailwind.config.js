// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6', 
        accent: '#EC4899',
        background: '#F3F4F6',
        foreground: '#1F2937',
        border: '#E5E7EB',
        muted: {
          foreground: '#6B7280',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF385C',
        secondary: '#00A699',
        dark: '#222222',
      },
      boxShadow: {
        'custom': '0 2px 8px rgba(0,0,0,0.1)',
        'hover': '0 4px 16px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './sections/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'purple': '#635FC7',
        'purplehover': '#A8A4FF',
        'red': '#EA5555',
        'redhover': '#FF9898',
        'verydarkgrey': '#2021C',
        'darkgrey': '#2B2C37',
        'mediumgrey': '#828FA3',
        'lightgrey': '#F4F7FD',
        'lightlines': '#E4EBFA',
        'darklines': '#3E3F4E'
      },
      letterSpacing: {
        'widest': '.15rem'
      }
    },
  },
  plugins: [],
}

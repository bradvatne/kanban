/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './sections/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: ['bg-[#49C4E5]', 'bg-[#8471F2]', 'bg-[#67E2AE]'],
  theme: {
    extend: {
      colors: {
        'purple': '#635FC7',
        'purplehover': '#A8A4FF',
        'red': '#EA5555',
        'redhover': '#FF9898',
        'verydarkgrey': '#20212C',
        'darkgrey': '#2B2C37',
        'mediumgrey': '#828FA3',
        'lightgrey': '#F4F7FD',
        'lightlines': '#E4EBFA',
        'darklines': '#3E3F4E'
      },
      letterSpacing: {
        'widest': '.15rem'
      },
      boxShadow: {
        'custom': '0px 4px 6px 0px rgba(54, 78, 126, 0.10);'
      },
      fontSize: {
        'custom' : '0.9375rem'
      }
    },
  },
  plugins: [],
}

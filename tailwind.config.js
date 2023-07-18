/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.js'],
  },
  theme: {
    extend: {
      borderRadius: {
        'big': '40px',
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        "palette": {
          DEFAULT: "#435B23",
          dark: "#3C450D",
          light: "#D9DC8F",
          brown: "#73715F"
        },
        "demo": {
          DEFAULT: "#FBF7EF",
        },
        backgroundImage: {
          'header': "url('./peru-forest-aerial.jpg)",
        }
      },
    },
  },
  plugins: [],
};



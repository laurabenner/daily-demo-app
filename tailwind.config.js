/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.js'],
    options: {
      safelist: [
        {
          pattern: /^text-/,
        },
        {
          pattern: /^bg-/,
        },
        {
          pattern: /^from-/,
        },
        {
          pattern: /^via-/,
        },
        {
          pattern: /^to-/,
        },
      ],
    },
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
        "elephant-trails": {
          DEFAULT: "#3590f3",
          dark: "#08488c",
          light: "#d7e8ff"
        },
        "american-bison": {
          DEFAULT: "#4f0c63",
          dark: "#290631",
          light: "#e9a3c8"
        },
        "bird-house": {
          DEFAULT: "#5b8f6e",
          dark: "#2d5b47",
          light: "#e5f2e0"
        },
        "amazonia": {
          DEFAULT: "#F26419",
          dark: "#a13407",
          light: "#fbe8d5"
        },
        "small-mammal-house": {
          DEFAULT: "#87B37A",
          dark: "#405d37",
          light: "#f1f8e5"
        },
        "africa-trail": {
          DEFAULT: "#2F4858",
          dark: "#0f1924",
          light: "#c8d8e1"
        },
        "primates": {
          DEFAULT: "#F6AE2D",
          dark: "#8b5e06",
          light: "#fdf4cd"
        },
        "reptile-discovery-center": {
          DEFAULT: "#987175",
          dark: "#583a31",
          light: "#f4eae2"
        },
        "american-trail": {
          DEFAULT: "#06893C",
          dark: "#03471e",
          light: "#a0f6b1"
        },
        "asia-trail": {
          DEFAULT: "#084C61",
          dark: "#032c3d",
          light: "#a8d9e7"
        },
        "great-cats": {
          DEFAULT: "#F7ACCF",
          dark: "#b15c7f",
          light: "#fdf0f6"
        },
        "kids-farm": {
          DEFAULT: "#C62606",
          dark: "#841904",
          light: "#f8a79d"
        },
        "claws-paws-pathway": {
          DEFAULT: "#4CB5AE",
          dark: "#1c736f",
          light: "#dbf4f3"
        },
        "demo": {
          DEFAULT: "#FBF7EF",
        },
      },
    },
  },
  plugins: [],
};



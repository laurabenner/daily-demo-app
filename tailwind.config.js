/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.js'],
    options: {
      safelist: [
        'text-elephant-trails',
        'text-american-bison',
        'text-bird-house',
        'text-amazonia',
        'text-small-mammal-house',
        'text-africa-trail',
        'text-primates',
        'text-reptile-discovery-center',
        'text-american-trail',
        'text-asia-trail',
        'text-great-cats',
        'text-kids-farm',
        'text-claws-paws-pathway'
      ],
    },
  },
  theme: {
    extend: {
      colors: {
        "elephant-trails": "#3590f3",
        "american-bison": "#4f0c63",
        "bird-house": "#5b8f6e",
        "amazonia": "#F26419",
        "small-mammal-house": "#87B37A",
        "africa-trail": "#2F4858",
        "primates": "#F6AE2D",
        "reptile-discovery-center": "#987175",
        "american-trail": "#06893C",
        "asia-trail": "#084C61",
        "great-cats": "#F7ACCF",
        "kids-farm": "#C62606",
        "claws-paws-pathway": "#4CB5AE",
        "demo": "#FBF7EF",
      },
    },
  },
  plugins: [],
};



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#002060',
        'secondary': '#ABAAAA',
        'gray1': '#524C4C',
        'red': '#EE1717',
        'gray2': '#6F6F6F',
        'white1': '#F6F5F5',
        'gray3': '#ACACAC',
        'black1': '#212121',
        'yellow': '#FFA135',
        'lightyellow': '#F9D4AB',
        'lightgray': '#8C8A8A',
        'nevyblue': '#273446',
        'lightgray1': '#656565',
        'lightgray2': '#827B7B',
      },
      backgroundColor: {
        'primary': '#002060',
        'gray': '#FAFAFA',
        'gray1': '#FAF9F9',
        'lightblue': '#8db3ff33',
      }
    },
  },
  plugins: [],
}
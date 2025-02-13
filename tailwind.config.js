import flowbite from 'flowbite-react/tailwind';
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        main_color: '#3D9635',
        secondary_color: '#0C1E0B',
        third_color: '#EAF7E8',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
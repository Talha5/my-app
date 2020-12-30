module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  // FIXME: tailwind css issue for rendering.
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

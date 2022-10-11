/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/components/Navbar.js",
    "./src/components/Game.js",
    "./src/components/Board.js",
    "./src/components/Keyboard.js",
    "./src/App.js",
    "./src/components/BoardTile.js",
    "./src/components/Tile.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

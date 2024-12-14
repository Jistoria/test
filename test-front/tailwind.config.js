/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Incluye las rutas correctas
  theme: {
    extend: {},
  },
  plugins: ['daisyui'], // Asegúrate de que DaisyUI esté en la lista de plugins
  daisyui: {
    themes: ['light', 'dark'], // Configura los temas de DaisyUI si los necesitas
  },
};


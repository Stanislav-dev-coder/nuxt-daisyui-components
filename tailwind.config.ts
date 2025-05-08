import type { Config } from "tailwindcss"

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],


  theme: {
    extend: {},
  },

  plugins: [
    require("daisyui"),
  ],
} satisfies Config

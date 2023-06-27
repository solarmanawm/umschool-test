import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            gray: colors.gray,
            black: colors.black,
            yellow: colors.yellow,
            white: colors.white,
        },
        extend: {
        },
    },
    plugins: [],
}
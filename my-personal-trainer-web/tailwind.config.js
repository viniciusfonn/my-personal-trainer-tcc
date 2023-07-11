/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'forgot-password': "url(/bg-forgot-password.jpg)"
			},
			colors: {
				gray: {
					lighter: "#CECECE",
					light: "#3E3B47",
					default: "#312E38",
					dark: "#232129",
					hard: "#666360"
				},
				red: {
					light: "#BE2727",
					default: "#890000",
					dark: "#6B0000"
				}
			}
		},
	},
	plugins: [],
}

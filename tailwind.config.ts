const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					fade: 'hsla(var(--primary-fade))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					fade: 'hsl(var(--secondary) / 0.15)',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					fade: 'hsl(var(--accent) / 0.15)',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				native: {
					DEFAULT: 'hsl(var(--native))',
					foreground: 'hsl(var(--native-foreground))',
				},
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			backgroundImage: {
				// bg-[repeating-linear-gradient(45deg,hsl(var(--border))_0,hsl(var(--border))_1px,transparent_0,transparent_50%)]
				diagonal:
					'repeating-linear-gradient(45deg,hsl(var(--border)) 0,hsl(var(--border)) 1px,transparent 0,transparent 50%)',
			},
			background: {
				gradient: 'var(--gradient)',
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }: { addVariant: (name: string, variants: string[]) => void }) {
			addVariant('hocus', ['&:hover', '&:focus']);
			addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus &']);
			addVariant('factive', ['&:active', '&:focus']);
			addVariant('all', ['&:active', '&:focus', '&:hover']);
			addVariant('list', ['.list-primary &']);
			addVariant('light', ['html.light &']);
		}),
		require('tailwindcss-animate'),
	],
};

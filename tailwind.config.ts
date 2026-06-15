import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#DAF1DE',
  			foreground: '#051F20',
  			card: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#051F20'
  			},
  			popover: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#051F20'
  			},
  			primary: {
  				DEFAULT: '#235347',
  				foreground: '#DAF1DE'
  			},
  			secondary: {
  				DEFAULT: '#BEB69B',
  				foreground: '#051F20'
  			},
  			muted: {
  				DEFAULT: '#DAF1DE',
  				foreground: '#163832'
  			},
  			accent: {
  				DEFAULT: '#163832',
  				foreground: '#DAF1DE'
  			},
  			destructive: {
  				DEFAULT: '#ef4444',
  				foreground: '#ffffff'
  			},
  			border: '#0B2B26',
  			input: '#0B2B26',
  			ring: '#163832',
  			brand: {
  				darkest: '#051F20',
  				dark: '#0B2B26',
  				mid: '#163832',
  				primary: '#235347',
  				light: '#BEB69B',
  				lightest: '#DAF1DE'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

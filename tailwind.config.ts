import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aviation: {
          blue: '#1e3a8a',
          'blue-light': '#3b82f6',
          'blue-dark': '#1e40af',
          purple: '#6366f1',
        },
      },
      backgroundImage: {
        'gradient-aviation': 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #6366f1 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(99, 102, 241, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config







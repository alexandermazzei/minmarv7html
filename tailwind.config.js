// tailwind.config.js
module.exports = {
  content: [
    "./*.html", 
    "./**/*.html",
    "./src/**/*.css"
  ],
  safelist: [
    'btn-header',
    'border-[#003B70]',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    // Disable specific core plugins causing linting issues
    appearance: false,
    verticalAlign: false,
  },
  theme: {
    extend: {
      // Add custom appearance utilities
      appearance: {
        none: 'none',
        auto: 'auto',
        button: 'button',
      },
    },
  },
  plugins: [
    // Custom plugin to handle appearance utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.appearance-none': {
          '-webkit-appearance': 'none',
          '-moz-appearance': 'none',
          'appearance': 'none',
        },
        '.appearance-button': {
          '-webkit-appearance': 'button',
          '-moz-appearance': 'button',
          'appearance': 'button',
        },
      };
      addUtilities(newUtilities);
    },
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors based on your CSS variables from globals.css
        // Tailwind can use HSL values directly with the 'hsl(var(--variable))' syntax in CSS
        // Or you can define them here if you prefer.
        'minmar-blue': 'hsl(var(--minmar-blue-hsl))',
        'dark-blue': 'hsl(var(--dark-blue-hsl))',
        'light-gray': 'hsl(var(--light-gray-hsl))',
        'medium-gray': 'hsl(var(--medium-gray-hsl))',
        'dark-gray': 'hsl(var(--dark-gray-hsl))',
        'light-blue': 'hsl(var(--light-blue-hsl))',
        'energy-green': 'hsl(var(--energy-green-hsl))',
        'warm-accent': 'hsl(var(--warm-accent-hsl))',
        // For direct use like bg-primary, text-primary
        'primary': 'hsl(var(--primary-hsl))',
        'secondary': 'hsl(var(--secondary-hsl))',
        'muted': 'hsl(var(--muted-hsl))',
        'accent': 'hsl(var(--accent-hsl))',
        'destructive': 'hsl(var(--destructive-hsl))',
        'foreground': 'hsl(var(--foreground-hsl))',
        'background': 'hsl(var(--background-hsl))',
        'card': 'hsl(var(--card-hsl))',
        'popover': 'hsl(var(--popover-hsl))',
        'primary-foreground': 'hsl(var(--primary-foreground-hsl))',
        'secondary-foreground': 'hsl(var(--secondary-foreground-hsl))',
        'muted-foreground': 'hsl(var(--muted-foreground-hsl))',
        'accent-foreground': 'hsl(var(--accent-foreground-hsl))',
        'destructive-foreground': 'hsl(var(--destructive-foreground-hsl))',
        'card-foreground': 'hsl(var(--card-foreground-hsl))',
        'popover-foreground': 'hsl(var(--popover-foreground-hsl))',
        'border-color': 'hsl(var(--border-hsl))', // Renamed for clarity
        'input-color': 'hsl(var(--input-hsl))',   // Renamed for clarity
        'ring-color': 'hsl(var(--ring-hsl))',     // Renamed for clarity
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.5rem', // Corresponds to --radius
        'md': '0.375rem',
        'lg': '0.5rem',
      }
    },
  },
  plugins: [],
}
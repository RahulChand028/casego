// Design System Tokens using Tailwind Classes

export const designTokens = {
  // Color Classes
  colors: {
    primary: {
      50: 'bg-yellow-50 text-yellow-50',
      100: 'bg-yellow-100 text-yellow-100',
      200: 'bg-yellow-200 text-yellow-200',
      300: 'bg-yellow-300 text-yellow-300',
      400: 'bg-yellow-400 text-yellow-400',
      500: 'bg-yellow-500 text-yellow-500',
      600: 'bg-yellow-600 text-yellow-600',
      700: 'bg-yellow-700 text-yellow-700',
      800: 'bg-yellow-800 text-yellow-800',
      900: 'bg-yellow-900 text-yellow-900',
    },
    gray: {
      50: 'bg-gray-50 text-gray-50',
      100: 'bg-gray-100 text-gray-100',
      200: 'bg-gray-200 text-gray-200',
      300: 'bg-gray-300 text-gray-300',
      400: 'bg-gray-400 text-gray-400',
      500: 'bg-gray-500 text-gray-500',
      600: 'bg-gray-600 text-gray-600',
      700: 'bg-gray-700 text-gray-700',
      800: 'bg-gray-800 text-gray-800',
      900: 'bg-gray-900 text-gray-900',
    },
    success: {
      50: 'bg-green-50 text-green-50',
      100: 'bg-green-100 text-green-100',
      200: 'bg-green-200 text-green-200',
      300: 'bg-green-300 text-green-300',
      400: 'bg-green-400 text-green-400',
      500: 'bg-green-500 text-green-500',
      600: 'bg-green-600 text-green-600',
      700: 'bg-green-700 text-green-700',
      800: 'bg-green-800 text-green-800',
      900: 'bg-green-900 text-green-900',
    },
    error: {
      50: 'bg-red-50 text-red-50',
      100: 'bg-red-100 text-red-100',
      200: 'bg-red-200 text-red-200',
      300: 'bg-red-300 text-red-300',
      400: 'bg-red-400 text-red-400',
      500: 'bg-red-500 text-red-500',
      600: 'bg-red-600 text-red-600',
      700: 'bg-red-700 text-red-700',
      800: 'bg-red-800 text-red-800',
      900: 'bg-red-900 text-red-900',
    },
    background: {
      primary: 'bg-[#FDFBF7]',
      secondary: 'bg-white',
      tertiary: 'bg-gray-50',
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      tertiary: 'text-gray-600',
      inverse: 'text-white',
    },
  },

  // Typography Classes
  typography: {
    fontFamily: {
      sans: 'font-sans',
      mono: 'font-mono',
    },
    fontSize: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    fontWeight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    lineHeight: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
  },

  // Spacing Classes
  spacing: {
    padding: {
      0: 'p-0',
      1: 'p-1',
      2: 'p-2',
      3: 'p-3',
      4: 'p-4',
      5: 'p-5',
      6: 'p-6',
      8: 'p-8',
      10: 'p-10',
      12: 'p-12',
      16: 'p-16',
      20: 'p-20',
    },
    margin: {
      0: 'm-0',
      1: 'm-1',
      2: 'm-2',
      3: 'm-3',
      4: 'm-4',
      5: 'm-5',
      6: 'm-6',
      8: 'm-8',
      10: 'm-10',
      12: 'm-12',
      16: 'm-16',
      20: 'm-20',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
    },
  },

  // Border Classes
  borders: {
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      base: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    },
    width: {
      0: 'border-0',
      1: 'border',
      2: 'border-2',
      4: 'border-4',
      8: 'border-8',
    },
    color: {
      gray: 'border-gray-300',
      primary: 'border-yellow-500',
      error: 'border-red-500',
      success: 'border-green-500',
    },
  },

  // Shadow Classes
  shadows: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    base: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },

  // Transition Classes
  transitions: {
    none: 'transition-none',
    all: 'transition-all',
    colors: 'transition-colors',
    opacity: 'transition-opacity',
    shadow: 'transition-shadow',
    transform: 'transition-transform',
  },
} as const;

// Common component class combinations
export const componentClasses = {
  // Button variants
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer',
    primary: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    secondary: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    },
  },

  // Input variants
  input: {
    base: 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500',
    error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
    success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
  },

  // Modal variants
  modal: {
    overlay: 'fixed inset-0 bg-gray-900/50 z-40',
    content: 'bg-white rounded-lg shadow-xl max-w-lg w-full p-6 font-sans',
    header: 'flex items-center justify-between mb-6',
    body: 'space-y-4',
    footer: 'flex gap-3 pt-4',
  },

  // Card variants
  card: {
    base: 'bg-white rounded-lg border border-gray-200',
    header: 'px-6 py-4 border-b border-gray-200',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 border-t border-gray-200',
  },

  // Loading variants
  loading: {
    spinner: 'border-gray-300 border-t-yellow-500 rounded-full animate-spin',
    sizes: {
      sm: 'w-4 h-4 border-2',
      md: 'w-6 h-6 border-3',
      lg: 'w-8 h-8 border-4',
    },
  },
} as const;

export type DesignToken = keyof typeof designTokens;
export type ComponentClass = keyof typeof componentClasses; 
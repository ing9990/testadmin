// src/styles/theme.js

export const theme = {
  colors: {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    warning: {
      50: '#fefbf3',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },

  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none'
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },

  fontSize: {
    xs: ['0.75rem', {lineHeight: '1rem'}],
    sm: ['0.875rem', {lineHeight: '1.25rem'}],
    base: ['1rem', {lineHeight: '1.5rem'}],
    lg: ['1.125rem', {lineHeight: '1.75rem'}],
    xl: ['1.25rem', {lineHeight: '1.75rem'}],
    '2xl': ['1.5rem', {lineHeight: '2rem'}],
    '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
    '4xl': ['2.25rem', {lineHeight: '2.5rem'}],
    '5xl': ['3rem', {lineHeight: '1'}],
    '6xl': ['3.75rem', {lineHeight: '1'}],
    '7xl': ['4.5rem', {lineHeight: '1'}],
    '8xl': ['6rem', {lineHeight: '1'}],
    '9xl': ['8rem', {lineHeight: '1'}]
  },

  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },

  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slowest: '1000ms'
  }
};

// 유틸리티 함수들
export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getColorWithOpacity = (color, opacity) => {
  return hexToRgba(color, opacity);
};

// 컴포넌트 스타일 프리셋
export const componentPresets = {
  card: {
    base: {
      backgroundColor: 'white',
      borderRadius: theme.borderRadius.xl,
      boxShadow: theme.shadows.md,
      border: `1px solid ${theme.colors.neutral[200]}`,
      overflow: 'hidden'
    },
    hover: {
      boxShadow: theme.shadows.lg,
      transform: 'translateY(-2px)',
      transition: `all ${theme.transitions.normal} ease`
    }
  },

  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing[2],
      padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
      borderRadius: theme.borderRadius.lg,
      fontSize: theme.fontSize.sm[0],
      fontWeight: theme.fontWeight.medium,
      cursor: 'pointer',
      transition: `all ${theme.transitions.fast} ease`,
      border: 'none',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden'
    },
    primary: {
      backgroundColor: theme.colors.primary[600],
      color: 'white',
      '&:hover': {
        backgroundColor: theme.colors.primary[700]
      },
      '&:active': {
        backgroundColor: theme.colors.primary[800]
      }
    },
    secondary: {
      backgroundColor: 'white',
      color: theme.colors.neutral[700],
      border: `1px solid ${theme.colors.neutral[300]}`,
      '&:hover': {
        backgroundColor: theme.colors.neutral[50],
        borderColor: theme.colors.neutral[400]
      }
    },
    danger: {
      backgroundColor: theme.colors.danger[600],
      color: 'white',
      '&:hover': {
        backgroundColor: theme.colors.danger[700]
      }
    },
    success: {
      backgroundColor: theme.colors.success[600],
      color: 'white',
      '&:hover': {
        backgroundColor: theme.colors.success[700]
      }
    }
  },

  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing[1],
      padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
      borderRadius: theme.borderRadius.full,
      fontSize: theme.fontSize.xs[0],
      fontWeight: theme.fontWeight.semibold
    },
    primary: {
      backgroundColor: getColorWithOpacity(theme.colors.primary[600], 0.1),
      color: theme.colors.primary[700]
    },
    success: {
      backgroundColor: getColorWithOpacity(theme.colors.success[600], 0.1),
      color: theme.colors.success[700]
    },
    warning: {
      backgroundColor: getColorWithOpacity(theme.colors.warning[600], 0.1),
      color: theme.colors.warning[700]
    },
    danger: {
      backgroundColor: getColorWithOpacity(theme.colors.danger[600], 0.1),
      color: theme.colors.danger[700]
    },
    info: {
      backgroundColor: getColorWithOpacity(theme.colors.info[600], 0.1),
      color: theme.colors.info[700]
    }
  },

  input: {
    base: {
      width: '100%',
      padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
      borderRadius: theme.borderRadius.lg,
      border: `2px solid ${theme.colors.neutral[300]}`,
      fontSize: theme.fontSize.sm[0],
      color: theme.colors.neutral[900],
      backgroundColor: 'white',
      transition: `all ${theme.transitions.fast} ease`,
      outline: 'none',
      '&:focus': {
        borderColor: theme.colors.primary[500],
        boxShadow: `0 0 0 3px ${getColorWithOpacity(theme.colors.primary[500],
            0.1)}`
      },
      '&:disabled': {
        backgroundColor: theme.colors.neutral[100],
        color: theme.colors.neutral[500],
        cursor: 'not-allowed'
      }
    }
  },

  table: {
    container: {
      width: '100%',
      overflowX: 'auto'
    },
    base: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: theme.fontSize.sm[0]
    },
    header: {
      backgroundColor: theme.colors.neutral[50],
      borderBottom: `2px solid ${theme.colors.neutral[200]}`
    },
    headerCell: {
      padding: theme.spacing[4],
      textAlign: 'left',
      fontWeight: theme.fontWeight.semibold,
      color: theme.colors.neutral[700],
      whiteSpace: 'nowrap'
    },
    row: {
      borderBottom: `1px solid ${theme.colors.neutral[200]}`,
      transition: `background-color ${theme.transitions.fast} ease`,
      '&:hover': {
        backgroundColor: theme.colors.neutral[50]
      }
    },
    cell: {
      padding: `${theme.spacing[4]} ${theme.spacing[4]}`,
      color: theme.colors.neutral[900]
    }
  }
};

// 반응형 유틸리티
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const mediaQuery = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`
};

// 애니메이션 프리셋
export const animations = {
  fadeIn: {
    from: {opacity: 0},
    to: {opacity: 1}
  },
  slideUp: {
    from: {transform: 'translateY(10px)', opacity: 0},
    to: {transform: 'translateY(0)', opacity: 1}
  },
  slideDown: {
    from: {transform: 'translateY(-10px)', opacity: 0},
    to: {transform: 'translateY(0)', opacity: 1}
  },
  scaleIn: {
    from: {transform: 'scale(0.95)', opacity: 0},
    to: {transform: 'scale(1)', opacity: 1}
  }
};
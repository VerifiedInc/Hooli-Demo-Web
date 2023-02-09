import { createTheme } from '@mui/material/styles';
import * as colors from './colors';

declare module '@mui/material/styles' {
  // custom palette
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  // custom typography
  interface TypographyVariants {
    label: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
  }
}

// custom typography
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
  }
}

const typography = {
  fontFamily: 'InterstateCondensed',
  h1: {
    fontSize: '2.125rem',
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.35,
  },
  h2: {
    fontSize: '1.4rem',
    fontWeight: 900,
    letterSpacing: 0,
    lineHeight: 1,
  },
  h3: {
    fontSize: '1.4rem',
    fontWeight: 700,
    letterSpacing: 0.3,
    lineHeight: 1.35,
  },
  h4: {
    fontSize: '1.15rem',
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.2,
  },
  h5: {
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.1875,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.15px',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.1875,
  },
  subtitle2: {
    fontFamily: 'Interstate',
    fontSize: '0.875rem',
    fontWeight: 400,
    letterSpacing: 0.1,
    lineHeight: 1.133,
  },
  body1: {
    fontSize: '1.25rem',
    fontWeight: 300,
    letterSpacing: 0,
    lineHeight: 1.2,
  },
  body2: {
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.1875,
  },
  button: {
    // fontSize set by MUI button component sizes, setting it here will screw that up
    fontWeight: 900,
    letterSpacing: 0,
    lineHeight: 1.2,
  },
  caption: {
    fontSize: '0.5rem',
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.25,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.25,
  },
  label: {
    fontFamily: 'Interstate',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: 1,
  },
};

// Create a theme instance.

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue,
      light: colors.lightBlue,
      dark: colors.darkBlue,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.green,
      light: colors.lightGreen,
      dark: colors.black,
      contrastText: colors.white,
    },
    error: {
      main: colors.red,
      light: colors.lightRed,
      dark: colors.darkRed,
      contrastText: colors.white,
    },
    warning: {
      main: colors.yellow,
      light: colors.yellow, // lightYellow is too light, makes alerts practically invisible
      dark: colors.darkYellow,
      contrastText: colors.white,
    },
    success: {
      main: colors.green,
      light: colors.green, // lightGreen is too light for alerts
      dark: colors.darkGreen,
      contrastText: colors.white,
    },
    info: {
      main: colors.blue,
      light: colors.lightBlue,
      dark: colors.darkBlue,
      contrastText: colors.white,
    },
    neutral: {
      main: colors.grey,
      light: colors.lightGrey,
      dark: colors.darkGrey,
    },
  },
  components: {
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          ...typography.body2,
          fontSize: '1.1rem',
          fontWeight: 700,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginLeft: '0.15rem',
          fontFamily: 'Interstate',
          fontSize: '1rem',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: '',
            zIndex: -1,
            background: 'var(--background, inherit)',
          },
          color: colors.darkBlue,
        },
        shrink: {
          ...typography.label,
          fontSize: '1rem',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 1305,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active,&.Mui-completed': {
            color: colors.blue,
          },
        },
        text: {
          fontWeight: 700,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          ...typography.h4,
        },
        root: {},
      },
    },
    MuiAlert: {
      // TODO: figure out how to get alerts to use main colors instead of light
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...typography.h4,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          ...typography.body2,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          ...typography.subtitle2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
        fullWidth: true,
        InputProps: { disableUnderline: true },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        sx: {
          borderRadius: 2,
        },
      },
    },
  },
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1467,
      xl: 1536,
    },
  },
});

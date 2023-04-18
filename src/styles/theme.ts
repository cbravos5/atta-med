import { GlobalStyles, MantineTheme, MantineThemeOverride } from "@mantine/core";
import { fonts } from "./fonts";

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',

  fontFamily: fonts.poppins,

  colors: {
    primary: ['#62929E'],
    secondary: ['#FDFDFF'],
    tertiary: ['546A7B'],
    support: ['#393D3F','#C6C5B9']
  },

  breakpoints: {
    xs: '24em'
  },

  globalStyles: ((theme) => ({
    '*': {
      padding: 0,
      margin: 0,

      boxSizing: 'border-box',
    },

    'html, body, #__next': {
      minWidth: '100%',
      minHeight: '100%',

      height: '100%',

      scrollBehavior: 'smooth',
    },

    body: {
      background: theme.colors.primary[0],

      overflowY: 'scroll',

      '&::-webkit-scrollbar': {
        width: '0.375rem',
        background: theme.colors.primary[0]
      },
    
      '&::-webkit-scrollbar-thumb': {
        background: theme.colors.tertiary[0],
        borderRadius: 999
      }
    }
  })) 
}
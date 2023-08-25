import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: 'dark'
};

const theme = extendTheme({ config })

export default theme;

// to add dark mode: 
// in main.tsx 
//      <ChakraProvider theme={theme}>
//      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
// then add color mode switch component
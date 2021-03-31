import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import {
  ThemeProvider as ThemeProv,
  theme as them,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";
import { AppContext } from "./views/login/hooks/context";

const App = () => {
  const { data: dataContext } = useContext(AppContext);
  let isAdmin = (dataContext?.state?.usuario.type == "Júri" || dataContext?.state?.usuario.type == "Master")
  let isCandidate = (dataContext?.state?.usuario.type == "Utente")

  const routing = useRoutes(routes(isAdmin, isCandidate));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ThemeProv theme={them}>
      <CSSReset />
        <ColorModeProvider>
          {routing}
        </ColorModeProvider>
      </ThemeProv>
    </ThemeProvider>
  );
};

export default App;

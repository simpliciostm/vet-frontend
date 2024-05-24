import './App.css';
import { Routers } from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff'
    }
  },

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routers />
      </div>
    </ThemeProvider>
  );
}

export default App;

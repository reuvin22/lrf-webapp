import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Route from "./Route";

function ToastWrapper() {
  const { isDark } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme={isDark ? 'dark' : 'light'}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <Route />
      <ToastWrapper />
    </ThemeProvider>
  );
}

export default App;

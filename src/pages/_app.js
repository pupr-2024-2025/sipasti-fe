// src/pages/_app.js
import '../styles/globals.css'; // Ensure this path is correct
import Login from './login'; // Adjust the import if needed

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
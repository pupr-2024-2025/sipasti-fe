// src/pages/_app.js
import "../styles/globals.css";
import Login from "./login";
import localFont from "next/font/local";

const poppins = localFont({
  src: "../styles/Poppins-Regular.woff",
  variable: "--font-poppins-r",
  weight: "100 200 300 400 500 600 700 800 900",
});

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

function MyApp({ Component, pageProps }) {
  return (
    <div
      className={`${poppins.variable} font-[family-name:var(--font-poppins-r)] antialiased`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

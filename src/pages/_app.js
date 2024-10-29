// src/pages/_app.js
import "../styles/globals.css";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useEffect } from "react";

const poppins = localFont({
  src: "../styles/Poppins-Regular.woff",
  variable: "--font-poppins-r",
  weight: "100 200 300 400 500 600 700 800 900",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div
      className={`${poppins.variable} font-[family-name:var(--font-poppins-r)] antialiased`}
      suppressHydrationWarning={false}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

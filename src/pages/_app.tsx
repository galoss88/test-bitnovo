import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Footer from "./_layout/Footer";
import { CurrencyProvider } from "@/pages/_components/CurrencyProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <CurrencyProvider>
          <Component {...pageProps} />
        </CurrencyProvider>
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;

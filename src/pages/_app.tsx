import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Footer from "./_layout/Footer";
import { CurrencyProvider } from "@/components/CurrencyProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </CurrencyProvider>
  );
}

export default MyApp;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Orbitron } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider>
      <main className={orbitron.className}>
        <Component {...pageProps} />
      </main>
    </ThirdwebProvider>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={orbitron.className}>
      <Component {...pageProps} />
    </main>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { useEffect, useState } from "react";
import Link from "next/link";

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: "a8024e8262cb4e7102941a3577b5a5c0",
    appName: "0x Next.js Demo App",
    appDescription: "A Next.js demo app for 0x Swap API and ConnectKit",
  })
);

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Ensure Component is a valid React component
  if (!Component) return null;

  return (
    <div>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <header className="sticky top-0 z-10 w-full p-4 m-0 flex flex-row items-center justify-between bg-gradient-to-r from-blue-400 to-indigo-600 bg-opacity-50 backdrop-filter backdrop-blur-lg">
            <Link href="/">
              <h1 className="text-white font-bold text-2xl cursor-pointer">
                DeFi Application
              </h1>
            </Link>
            <div className="flex space-x-4">
              <Link href="/crypto-prices">
                <h2 className="text-white cursor-pointer hover:text-gray-300">
                  Crypto Prices
                </h2>
              </Link>
              <Link href="/crypto-swapping">
                <h2 className="text-white cursor-pointer hover:text-gray-300">
                  Crypto Swapping
                </h2>
              </Link>
            </div>
            <ConnectKitButton />
          </header>

          {/* Ensure Component is only rendered when mounted is true */}
          {mounted && <Component {...pageProps} />}
        </ConnectKitProvider>
      </WagmiConfig>
    </div>
  );
}

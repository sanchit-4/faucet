import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import your existing provider (adjust path if needed)
import { SolanaProvider } from "../components/WalletProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Faucet",
  description: "Devnet Token Faucet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Wrap everything inside SolanaProvider */}
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
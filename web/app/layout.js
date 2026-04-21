import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Uzum Market",
  description: "E-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}

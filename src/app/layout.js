import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import { AppProvider } from "./components/AppContext";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700']  });

export const metadata = {
  title: "Food Ordering App",
  description: "Restaurat food ordering system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header/>
            {children}
            <footer className="border-t text-center p-8 text-gray-500 mt-16">
              &copy; 2024 All rights reserved.
            </footer>
         </AppProvider>
        </main>
        </body>
    </html>
  );
}

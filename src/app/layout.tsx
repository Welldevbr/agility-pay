"use client";

import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import { ModalProvider } from "@/contexts/modalContext";
import { TransactionsProvider } from "@/contexts/transactionsContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.className} w-full bg-base text-white overflow-x-hidden`}
      >
        <TransactionsProvider>
          <ModalProvider>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{ zIndex: 999 }}
              theme="dark"
            />
          </ModalProvider>
        </TransactionsProvider>
      </body>
    </html>
  );
}

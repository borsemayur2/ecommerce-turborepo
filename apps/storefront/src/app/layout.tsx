"use client";

import { useAppStore } from "../store/store";
import "./styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { redirect } from "next/navigation";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </>
      </body>
    </html>
  );
}

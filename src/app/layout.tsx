import type { Metadata } from "next";
import '../app/globals.css';
import { StoreProvider } from "@/store/storeProvider";

export const metadata :Metadata = {
  title: 'threadss',
  description : 'using Next.js'
}

export default function RootLayout({
  children,
}:{
  children :React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>

      <body suppressHydrationWarning={true}>
        <StoreProvider>
        {children}
        </StoreProvider>
        </body>
    </html>
  )
}
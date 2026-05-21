import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NextThemeProvider from "@/Providers/NextThemeProvider";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import { ToastContainer } from "react-toastify";

const Plus_Jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

// app/layout.js ফাইলে এই অংশটি বসান
export const metadata = {
  title: {
    template: "%s | MediQueue",
    default: "MediQueue", 
  },
  description: "MediQueue লার্নিং প্ল্যাটফর্ম",
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${Plus_Jakarta.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className=" bg-background text-foreground min-h-full flex flex-col">
        <NextThemeProvider>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
          <ToastContainer />
        </NextThemeProvider>
      </body>
    </html>
  );
}

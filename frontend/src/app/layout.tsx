import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Merriweather } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { ProjectsProvider } from "@/context/ProjetsContext";
import { UserProvider } from "@/context/UserContext";
import Script from "next/script";

const proximaNova = Poppins({
  variable: "--font-proxima",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const kazimir = Merriweather({
  variable: "--font-kazimir",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fund.ar",
  description:
    "Donation platform for projects with social purposes in Argentina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${proximaNova.variable} ${kazimir.variable} antialiased`}
    >
      <body className="flex flex-col min-h-screen">
        <Toaster position="bottom-right" richColors />
        <AuthProvider>
          <UserProvider>
            <ProjectsProvider>
              <>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </>
            </ProjectsProvider>
          </UserProvider>
        </AuthProvider>
        <Script
          src="https://cdn.botpress.cloud/webchat/v3.4/inject.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://files.bpcontent.cloud/2025/11/15/12/20251115122210-QHPGSF6Q.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

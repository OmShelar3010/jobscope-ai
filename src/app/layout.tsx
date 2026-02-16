import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "JobScope AI",
  description: "Advanced Job Recommendation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

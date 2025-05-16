import '@ant-design/v5-patch-for-react-19';

import { AntdRegistry } from '@ant-design/nextjs-registry';

import { queryClient } from '@/lib/react-query';
import { ThemeProvider } from '@/providers/theme.provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio MIA - Gerenciador de Planos de Aula",
  description: "Plataforma para organização e padronização de planos de aula",
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme='light' storageKey='next-ui-theme'>
      <ConfigProvider theme={{

      }}>
        <html lang="en">
          <body
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <AntdRegistry>
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </AntdRegistry>
          </body>
        </html>
      </ConfigProvider>
    </ThemeProvider>
  );
}

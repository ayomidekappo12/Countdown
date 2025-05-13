import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/config/theme-provider";
import App from "@/components/layouts/app";
import Script from "next/script";
import { Sora, Inter } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

// Combined class name
const fontClass = `${inter.variable} ${sora.variable}`;

export const metadata: Metadata = {
  title:
    "SynaraDev - Software development, designs and other technical service",
  description:
    "We - Provide software development, designs and other technical service company owners and industries.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SynaraDev",
  url: "https://SynaraDev.com",
  logo: "https://SynaraDev.com/images/logo.svg",
  description:
    "SynaraDev Provide software development, designs and other technical service company owners and industries.",
  sameAs: [
    "https://twitter.com/SynaraDev",
    "https://linkedin.com/company/SynaraDev",
    "https://www.instagram.com/SynaraDev",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@SynaraDev.com",
    contactType: "customer support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={fontClass}>
      <head>
        {" "}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className="bg-white w-full h-[100vh]"
          style={{
            backgroundImage: "url(/images/background.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <App>{children}</App>
        </body>
      </ThemeProvider>
    </html>
  );
}

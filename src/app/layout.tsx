import type { Metadata } from "next";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cesium Earth",
  description: "Offline 3D Earth visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
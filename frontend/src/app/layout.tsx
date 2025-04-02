import { AuthProvider } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Digital Football Paradise",
  description: "The ultimate Madden league management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

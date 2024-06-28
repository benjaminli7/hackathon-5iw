// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="white" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="white">
          <Notifications />
          <main className="container py-3 mx-auto">{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}

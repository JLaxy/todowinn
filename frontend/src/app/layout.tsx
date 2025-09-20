import { TodowinnProvider } from "@/contexts/todowinn-context";
import "@/styles/globals.css";

export const metadata = {
  title: "ToDowinn",
  description: "Project Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TodowinnProvider>{children}</TodowinnProvider>
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import { Navbar } from "./navbar";

export const metadata = {
  title: "Office Quotes",
  description: "Quotes from the TV show The Office",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100%-4rem)] w-full justify-center border-y bg-muted/40 p-8">
        <div className="w-full max-w-prose">{children}</div>
      </main>
    </>
  );
}

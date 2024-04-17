import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { IconBrandGithub, IconGavel } from "@tabler/icons-react";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export const metadata = {
  title: "Office Quotes",
  description: "Every episode. Every quote.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className={`h-full font-sans ${GeistSans.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <footer className="flex items-center justify-center p-8 text-muted-foreground">
              <div className="flex w-full max-w-prose items-center justify-between">
                <div>
                  <Link
                    className="underline underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                    href={"https://github.com/maxwiseman"}
                  >
                    Max Wiseman
                  </Link>
                </div>
                <div className="flex gap-2">
                  <ThemeToggle />
                  <ResponsiveDialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ResponsiveDialogTrigger asChild>
                          <Button
                            variant={"outline"}
                            size={"icon"}
                            aria-label="View our legal disclaimer"
                            icon={<IconGavel />}
                          />
                        </ResponsiveDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>View disclaimer</TooltipContent>
                    </Tooltip>
                    <ResponsiveDialogContent>
                      <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>
                          Legal Disclaimer
                        </ResponsiveDialogTitle>
                      </ResponsiveDialogHeader>
                      This is only a fansite. It is not associated with NBC or
                      NBC&lsquo;s The Office. These are not meant to be real
                      transcripts, only comprehensive collections of quotes.
                      I&lsquo;ve tried to use as little scene description as
                      possible, only what is necessary for the quote to make
                      sense.
                    </ResponsiveDialogContent>
                  </ResponsiveDialog>
                  <Tooltip>
                    <Link
                      href={`https://github.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`}
                      target="_blank"
                      aria-label="View the source code on GitHub"
                    >
                      <TooltipTrigger asChild>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          aria-label="View the source code on GitHub"
                          icon={<IconBrandGithub />}
                        />
                      </TooltipTrigger>
                    </Link>
                    <TooltipContent>View source</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </footer>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

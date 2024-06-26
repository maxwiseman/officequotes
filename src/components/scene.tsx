"use client";

import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { IconLink } from "@tabler/icons-react";
import { useHover } from "usehooks-ts";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardButton } from "./clipboard-button";
import { usePathname, useSearchParams } from "next/navigation";
import { onlyText } from "react-children-utilities";
import { createHash } from "crypto";
import { env } from "@/env";

export function Scene({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hover = useHover(cardRef);
  const pathname = usePathname();
  const params = useSearchParams();
  const childText = onlyText(children);
  const textSha = createHash("sha256").update(childText).digest("hex");

  useEffect(() => {
    if (
      params.get("q") === encodeURIComponent(textSha.match(/.{4}$/)?.[0] ?? "")
    ) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [params, textSha]);

  return (
    <div className="scroll-m-10 pb-4" ref={cardRef}>
      <Card
        className={cn(
          "relative p-4",
          {
            "bg-muted":
              params.get("q") ===
              encodeURIComponent(textSha.match(/.{4}$/)?.[0] ?? ""),
          },
          className,
        )}
        {...props}
      >
        {children}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0">
          <div className="sticky top-4 my-3 -translate-x-3/4">
            <AnimatePresence>
              {hover && (
                <motion.div
                  layout
                  layoutId="scene-link"
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ClipboardButton
                    className="pointer-events-auto"
                    text={`${env.NEXT_PUBLIC_SITE_URL}${pathname}?q=${encodeURIComponent(textSha.match(/.{4}$/)?.[0] ?? "")}`}
                    icon={<IconLink />}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </div>
  );
}

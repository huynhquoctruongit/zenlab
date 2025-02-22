"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const variants = {
  open: { opacity: 1, transition: { duration: 0.08 } },
  closed: { opacity: 0 },
};
const WrapModal = ({ children, isOpen, backdrop, setOpen = () => {}, className }: any) => {
  const background = backdrop || (
    <div onClick={() => setOpen(false)} className="w-screen h-screen bg-[black]/50"></div>
  );
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={variants}
          animate={"open"}
          exit={"closed"}
          initial={"closed"}
          className="fixed top-0 left-0 w-screen h-screen z-[10000000] justify-center flex items-center overflow-hidden"
        >
          <div className="absolute top-0 left-0z">{background}</div>
          <div className={cn("fixed", className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const Modal = ({ children, isOpen, setOpen = () => {}, backdrop, className }: any) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  if (typeof window === "undefined") return null;

  return createPortal(
    <WrapModal isOpen={isOpen} setOpen={setOpen} backdrop={backdrop} className={className}>
      {children}
    </WrapModal>,
    document.body,
  );
};

export default Modal;

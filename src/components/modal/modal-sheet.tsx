import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ModalSheet = ({ isOpen, setOpen, children }: any) => {
  const ref: any = useRef(undefined);
  const translateY = useMotionValue(0);
  const translateYRef = useRef(0);
  const handleDrag = (event: any, info: any) => {
    if (info.offset.y < 0) return;
    if (info.velocity.y > 2) {
      setOpen(false);
      return;
    }
    translateY.set(translateYRef.current + info.offset.y);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            onClick={() => {
              setOpen(null);
            }}
            initial={{ opacity: 0, y: 10, scale: 1.2 }}
            animate={{ opacity: isOpen ? 1 : 0, y: 0, scale: 1 }}
            exit={{ bottom: "-100%", opacity: 0.2, scale: 1 }}
            className="fixed w-screen top-0 left-0 h-screen bg-black/40 z-40"
          ></motion.div>
          <motion.div
            ref={ref}
            initial={{ bottom: "-100%", opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0, bottom: !isOpen ? "-100%" : 0 }}
            exit={{ bottom: "-100%", opacity: 0.2 }}
            transition={{
              duration: 0.3,
              easings: "easeInOut",
              ease: "easeInOut",
            }}
            className="fixed w-full h-fit z-[2000] left-0"
          >
            <motion.div className="pt-0 h-fit flex flex-col pb-0 lg:py-2.5 bg-white body-2 relative">
              <motion.div
                className="h-8 flex items-center justify-center"
                onDrag={handleDrag}
                onDragEnd={() => {
                  translateYRef.current = translateY.get();
                }}
                whileDrag={{ scaleX: 1.2, scaleY: 1.2 }}
                dragConstraints={{ top: 0, right: 0, bottom: 0 }}
                drag="y"
                dragMomentum={false}
                dragElastic={0}
              >
                <EllipsisVertical className="w-5 h-5 stroke-slate-500 rotate-90 lg:rotate-0" />
              </motion.div>
              <div className="absolute top-2.5 right-2.5">
                <div className="w-4 h-4 stroke-light-02/60 hover:stroke-light-01" onClick={() => setOpen(false)}>X</div>
              </div>
              <div className="flex-1">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ModalSheet;

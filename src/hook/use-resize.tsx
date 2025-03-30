"use client";
import { useState, useEffect } from "react";

export const useResponsive = () => {
  const [width, setWidth]: any = useState();
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};

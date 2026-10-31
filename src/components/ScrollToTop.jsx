import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { isHomePath } from "../routes";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  useEffect(() => {
    // Moving between "/" and "/contact" stays on the home page, which scrolls itself;
    // every other page change starts at the top.
    if (!(isHomePath(prev.current) && isHomePath(pathname))) window.scrollTo(0, 0);
    prev.current = pathname;
  }, [pathname]);
  return null;
}

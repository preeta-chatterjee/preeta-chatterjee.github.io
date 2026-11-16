import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { isHomePath } from "../routes";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  // Layout effect: this component sits before the routes, so it resets the scroll before the
  // new page's reveal checks (useReveal) measure what is on screen.
  useLayoutEffect(() => {
    // Moving between "/" and "/contact" stays on the home page, which scrolls itself;
    // every other page change starts at the top.
    if (!(isHomePath(prev.current) && isHomePath(pathname))) window.scrollTo(0, 0);
    prev.current = pathname;
  }, [pathname]);
  return null;
}

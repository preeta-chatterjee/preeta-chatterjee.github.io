// Shared route paths. /contact renders the home page and scrolls to its contact section.
export const CONTACT_PATH = "/contact";
export const isHomePath = pathname => pathname === "/" || pathname === CONTACT_PATH;

import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.ico";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="Collins Kiprono Foundation logo" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-display text-base sm:text-lg leading-none">
            <span className="font-semibold">Collins Kiprono Foundation</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6 text-sm">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground font-medium" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            About
          </Link>
          <Link
            to="/apply"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors"
          >
            Apply now
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Collins Kiprono Foundation. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://facebook.com/c.k_kiprono" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a>
          <a href="https://instagram.com/collinskiprono" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
          <a href="https://x.com/CkKiprono" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">X</a>
        </div>
      </div>
    </footer>
  );
}

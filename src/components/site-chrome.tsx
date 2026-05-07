import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";
import { AccessibilitySettings } from "./accessibility-settings";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Collins Kiprono Foundation logo"
            className="h-12 w-12 rounded-full object-cover shadow-lg ring-2 ring-white/90 bg-white"
          />
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
          <AccessibilitySettings />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/70" />
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid sm:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Collins Kiprono Foundation logo" className="h-10 w-10 rounded-full bg-white object-cover p-0.5" />
              <span className="font-display font-semibold leading-tight">
                Collins Kiprono<br />Foundation
              </span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/80 max-w-xs">
              Walking with the people of Marakwet West Sub-County —
              one hand, one family, one community at a time.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/85 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-primary-foreground/85 hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/apply" className="text-primary-foreground/85 hover:text-gold transition-colors">Apply</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Connect</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="https://facebook.com/c.k_kiprono" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/85 hover:text-gold transition-colors">Facebook · c.k_kiprono</a></li>
              <li><a href="https://instagram.com/collinskiprono" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/85 hover:text-gold transition-colors">Instagram · Collins Kiprono</a></li>
              <li><a href="https://x.com/CkKiprono" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/85 hover:text-gold transition-colors">X · CkKiprono</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Collins Kiprono Foundation. All rights reserved.</p>
          <p>Marakwet West Sub-County, Kenya</p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm">
            CK
          </span>
          <span className="font-display text-lg leading-none">
            <span className="font-semibold">CK Foundation</span>
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
        <p>© {new Date().getFullYear()} CK Foundation. All rights reserved.</p>
        <p>Serving Elgeyo-Marakwet County.</p>
      </div>
    </footer>
  );
}

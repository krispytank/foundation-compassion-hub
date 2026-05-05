import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, HeartHandshake, Sprout, Users } from "lucide-react";
import hero from "@/assets/hero-valley.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CK Foundation — Empowering Elgeyo-Marakwet" },
      { name: "description", content: "A charitable foundation supporting families and communities across Elgeyo-Marakwet County. Apply for support today." },
      { property: "og:title", content: "CK Foundation — Empowering Elgeyo-Marakwet" },
      { property: "og:description", content: "Apply for support from the CK Foundation." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/40" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 sm:pt-32 sm:pb-40 text-primary-foreground">
          <span className="inline-block rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium tracking-wide uppercase">
            CK Foundation · Elgeyo-Marakwet
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-display font-semibold max-w-3xl leading-[1.05]">
            Lifting communities, one family at a time.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/90 leading-relaxed">
            We provide opportunity, support, and dignity to residents across
            Marakwet and Keiyo. If you live in Elgeyo-Marakwet County, you are
            invited to apply.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3 font-medium shadow-elegant hover:brightness-105 transition"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              Apply for support <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-medium hover:bg-white/10 transition"
            >
              Learn about us
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-6 -mt-16 relative z-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: HeartHandshake, title: "Direct support", body: "Targeted assistance for vulnerable households across the county." },
            { icon: Sprout, title: "Sustainable growth", body: "Programs that empower families to build a lasting future." },
            { icon: Users, title: "Community first", body: "Rooted in the wards we serve — listening before we act." },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-card p-6 border border-border/60"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="grid place-items-center h-11 w-11 rounded-full bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 mt-24">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-display font-semibold">Ready to apply?</h2>
            <p className="mt-2 text-primary-foreground/85">
              Fill in a short form. We'll send you a confirmation immediately.
            </p>
          </div>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3 font-medium hover:brightness-105 transition"
          >
            Start application <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Collins Kiprono Foundation" },
      { name: "description", content: "About the Collins Kiprono Foundation, serving Marakwet West Sub-County." },
      { property: "og:title", content: "About — Collins Kiprono Foundation" },
      { property: "og:description", content: "Learn about the Collins Kiprono Foundation's mission in Marakwet West Sub-County." },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  { title: "Community Empowerment", body: "Supporting initiatives that uplift communities and foster sustainable development." },
  { title: "Education Access", body: "Providing resources and opportunities to ensure every child has access to quality education." },
  { title: "Partnership & Collaboration", body: "Working hand-in-hand with local organizations, governments, and volunteers to maximize impact." },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-display font-semibold">About the foundation</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          The Collins Kiprono Foundation is a charitable organization committed
          to uplifting the lives of residents of Marakwet West Sub-County.
          From Kapsowar to Lelan, Sengwer, Moiben/Kuserwo and Arror, we work
          hand in hand with local communities to deliver meaningful support —
          most recently through our community charity activity at Kapcherop
          Grounds, where neighbours, leaders and volunteers came together as one.
        </p>

        <div className="mt-12 space-y-8">
          {PILLARS.map((p) => (
            <div key={p.title}>
              <h2 className="text-2xl font-display font-semibold text-primary">{p.title}</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-border/60 pt-8">
          <h2 className="text-xl font-display font-semibold">Connect with us</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li><a className="hover:text-primary" href="https://facebook.com/c.k_kiprono" target="_blank" rel="noopener noreferrer">Facebook — c.k_kiprono</a></li>
            <li><a className="hover:text-primary" href="https://instagram.com/collinskiprono" target="_blank" rel="noopener noreferrer">Instagram — Collins Kiprono</a></li>
            <li><a className="hover:text-primary" href="https://x.com/CkKiprono" target="_blank" rel="noopener noreferrer">X — CkKiprono</a></li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

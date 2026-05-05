import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CK Foundation" },
      { name: "description", content: "About the CK Foundation, serving Elgeyo-Marakwet County." },
      { property: "og:title", content: "About — CK Foundation" },
      { property: "og:description", content: "Learn about the CK Foundation's mission in Elgeyo-Marakwet." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-display font-semibold">About the foundation</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          The CK Foundation is a charitable organization committed to uplifting
          the lives of residents across Elgeyo-Marakwet County. From the highlands
          of Marakwet to the valleys of Keiyo, we work hand in hand with local
          communities to deliver meaningful support.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          We believe every family deserves opportunity and dignity. Our
          application process is open to all residents of the county.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

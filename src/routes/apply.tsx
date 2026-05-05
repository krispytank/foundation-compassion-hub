import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";

import {
  COUNTY,
  CONSTITUENCIES,
  WARDS_BY_CONSTITUENCY,
  type Constituency,
} from "@/lib/locations";
import { applicationSchema, type ApplicationInput } from "@/lib/application-schema";
import { submitApplication } from "@/server/applications.functions";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — CK Foundation" },
      { name: "description", content: "Apply for support from the CK Foundation. Open to all residents of Elgeyo-Marakwet County." },
      { property: "og:title", content: "Apply — CK Foundation" },
      { property: "og:description", content: "Submit your application to CK Foundation in minutes." },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const submitFn = useServerFn(submitApplication);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      id_number: "",
      county: COUNTY,
      constituency: undefined as unknown as Constituency,
      ward: "",
      village: "",
      website: "",
    },
    mode: "onTouched",
  });

  const constituency = watch("constituency");
  const wards = constituency ? WARDS_BY_CONSTITUENCY[constituency] : [];

  const onSubmit = async (values: ApplicationInput) => {
    try {
      await submitFn({ data: values });
      setSubmitted(true);
      reset();
      toast.success("Application submitted", {
        description: "A confirmation has been sent to your email.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Submission failed", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster richColors position="top-center" />
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl px-6 py-14">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Application form
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-display font-semibold">
            Apply for support
          </h1>
          <p className="mt-3 text-muted-foreground">
            All fields are required. Your information is kept confidential.
          </p>
        </header>

        {submitted ? (
          <div
            className="rounded-2xl bg-card border border-border/60 p-8 text-center"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-display font-semibold">Thank you!</h2>
            <p className="mt-2 text-muted-foreground">
              Your application has been received. A confirmation email is on its
              way to you, and our team will be in touch.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Submit another
              </Button>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5 rounded-2xl bg-card border border-border/60 p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Honeypot — hidden from real users */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </label>
            </div>

            <Field label="Full name" error={errors.full_name?.message} htmlFor="full_name">
              <Input
                id="full_name"
                autoComplete="name"
                maxLength={100}
                placeholder="Jane Cherono"
                {...register("full_name")}
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone number" error={errors.phone?.message} htmlFor="phone">
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={20}
                  placeholder="+254 7XX XXX XXX"
                  {...register("phone")}
                />
              </Field>

              <Field label="Email address" error={errors.email?.message} htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </Field>
            </div>

            <Field label="ID number" error={errors.id_number?.message} htmlFor="id_number">
              <Input
                id="id_number"
                maxLength={20}
                placeholder="National ID number"
                {...register("id_number")}
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="County" htmlFor="county">
                <Input id="county" value={COUNTY} readOnly disabled />
                <input type="hidden" {...register("county")} value={COUNTY} />
              </Field>

              <Field
                label="Constituency"
                error={errors.constituency?.message}
                htmlFor="constituency"
              >
                <Select
                  value={constituency ?? ""}
                  onValueChange={(v) => {
                    setValue("constituency", v as Constituency, {
                      shouldValidate: true,
                      shouldTouch: true,
                    });
                    setValue("ward", "", { shouldValidate: false });
                  }}
                >
                  <SelectTrigger id="constituency">
                    <SelectValue placeholder="Select constituency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONSTITUENCIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("constituency")} />
              </Field>
            </div>

            <Field label="Ward" error={errors.ward?.message} htmlFor="ward">
              <Select
                value={watch("ward") ?? ""}
                onValueChange={(v) =>
                  setValue("ward", v, { shouldValidate: true, shouldTouch: true })
                }
                disabled={!constituency}
              >
                <SelectTrigger id="ward">
                  <SelectValue
                    placeholder={
                      constituency ? "Select ward" : "Select a constituency first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((w) => (
                    <SelectItem key={w} value={w}>
                      {w}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" {...register("ward")} />
            </Field>

            <Field label="Village" error={errors.village?.message} htmlFor="village">
              <Input
                id="village"
                maxLength={80}
                placeholder="Type your village name"
                {...register("village")}
              />
            </Field>

            <div className="pt-2 flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                By submitting, you confirm the information is accurate.
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full px-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  "Submit application"
                )}
              </Button>
            </div>
          </form>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

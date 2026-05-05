import { z } from "zod";
import { CONSTITUENCIES, WARDS_BY_CONSTITUENCY, type Constituency } from "./locations";

// Strict regexes to neutralize injection vectors and reject control characters.
const NAME_RE = /^[a-zA-Z\u00C0-\u017F'’\-\s]+$/;
const PHONE_RE = /^\+?[0-9\s\-]{7,20}$/;
const ID_RE = /^[A-Z0-9\-]{4,20}$/i;
const VILLAGE_RE = /^[a-zA-Z0-9\u00C0-\u017F'’\-\s]+$/;

export const applicationSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(2, "Full name is required")
      .max(100, "Full name is too long")
      .regex(NAME_RE, "Only letters, spaces, hyphens and apostrophes"),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number is too short")
      .max(20, "Phone number is too long")
      .regex(PHONE_RE, "Enter a valid phone number"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Enter a valid email address")
      .max(254, "Email is too long"),
    id_number: z
      .string()
      .trim()
      .min(4, "ID number is too short")
      .max(20, "ID number is too long")
      .regex(ID_RE, "ID may only contain letters, digits and hyphens"),
    county: z.literal("Elgeyo-Marakwet"),
    constituency: z.enum(CONSTITUENCIES),
    ward: z.string().trim().min(1, "Select a ward").max(80),
    village: z
      .string()
      .trim()
      .min(2, "Village is required")
      .max(80, "Village name is too long")
      .regex(VILLAGE_RE, "Only letters, numbers, spaces and hyphens"),
    // Honeypot — must remain empty.
    website: z.string().max(0),
  })
  .refine(
    (data) =>
      WARDS_BY_CONSTITUENCY[data.constituency as Constituency].includes(data.ward),
    { path: ["ward"], message: "Ward does not match the selected constituency" },
  );

export type ApplicationInput = z.infer<typeof applicationSchema>;

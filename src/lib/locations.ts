export const COUNTY = "Elgeyo-Marakwet" as const;

export const CONSTITUENCIES = ["Marakwet West"] as const;

export type Constituency = (typeof CONSTITUENCIES)[number];

export const WARDS_BY_CONSTITUENCY: Record<Constituency, readonly string[]> = {
  "Marakwet West": [
    "Kapsowar Ward",
    "Lelan Ward",
    "Sengwer Ward",
    "Moiben/Kuserwo Ward",
    "Arror Ward",
  ],
};

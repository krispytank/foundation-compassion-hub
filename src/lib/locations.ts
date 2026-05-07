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

export const SUB_LOCATIONS_BY_WARD: Record<string, readonly string[]> = {
  "Kapsowar Ward": [
    "Kapsowar",
    "Chebiemit",
    "Kapsumai",
    "Kapkanyar",
  ],
  "Lelan Ward": [
    "Lelan Kamoi",
    "Kaptalamwa",
    "Kapkirwok",
  ],
  "Sengwer Ward": [
    "Kipsomba",
    "Sengwer",
    "Kapcherop",
    "Kipnai",
    "Kiplombe",
    "Chebororwa",
    "Korpu",
    "Chemosot",
  ],
  "Moiben/Kuserwo Ward": [
    "Kamaat",
    "Moiben",
    "Kuserwo",
    "Kapsait",
  ],
  "Arror Ward": [
    "Kipkunur",
    "Arror Arror",
    "Koibarack",
    "Chesuman",
    "Talai",
    "Kapkoro",
  ],
};

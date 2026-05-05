export const COUNTY = "Elgeyo-Marakwet" as const;

export const CONSTITUENCIES = [
  "Marakwet West",
  "Marakwet East",
  "Keiyo North",
  "Keiyo South",
] as const;

export type Constituency = (typeof CONSTITUENCIES)[number];

export const WARDS_BY_CONSTITUENCY: Record<Constituency, readonly string[]> = {
  "Marakwet West": [
    "Kapsowar Ward",
    "Lelan Ward",
    "Sengwer Ward",
    "Moiben/Kuserwo Ward",
    "Arror Ward",
  ],
  "Marakwet East": [
    "Sambirir Ward",
    "Endo Ward",
    "Embobut Ward",
    "Kapyego Ward",
    "Kabo Ward",
  ],
  "Keiyo North": [
    "Emsoo Ward",
    "Kamariny Ward",
    "Tambach Ward",
    "Kaptarakwa Ward",
  ],
  "Keiyo South": [
    "Metkei Ward",
    "Soy North Ward",
    "Soy South Ward",
    "Kapchemutwa Ward",
    "Chepkorio Ward",
  ],
};

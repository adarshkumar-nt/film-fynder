import { Nunito, Roboto, Roboto_Mono } from "next/font/google";

export const roboto_mono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

export const nunito = Nunito({
  weight: "500",
  subsets: ["latin"]
})
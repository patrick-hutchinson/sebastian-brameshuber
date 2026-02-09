import { production, preview } from "./client";
import { aboutQuery, filmsQuery, screeningsQuery, siteQuery } from "./queries";

const isProduction = process.env.VERCEL_ENV === "production";
const isPreview = process.env.VERCEL_ENV === "preview";
const isLocal = !process.env.VERCEL_ENV;

export const getSanityClient = () => {
  if (isProduction) return production;
  if (isPreview || isLocal) return preview;

  return preview;
};

const client = getSanityClient();

console.log("client:", client.config());

export async function getSite() {
  return client.fetch(siteQuery);
}

export async function getAbout() {
  return client.fetch(aboutQuery);
}

export async function getScreenings() {
  return client.fetch(screeningsQuery);
}

export async function getFilms() {
  return client.fetch(filmsQuery);
}

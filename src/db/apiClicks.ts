import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(urlIds: string[]) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Clicks");
  }
  return data;
}

const parser = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "Desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      city,
      country,
      device,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click: ", error);
  }
};

export async function getClicksPerUrl(shortUrlId: string) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", shortUrlId);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to fetch clicks per url");
  }
  return data;
}

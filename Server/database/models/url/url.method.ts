import { URL } from "url";
import { UrlModel } from "./url.model";

export const makeid = (length: number) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
};

export const createShortLink = async (orignalUrl: string) => {
  const url = new URL(orignalUrl).hostname
    .replace("www", "")
    .split(".")
    .filter((i) => i)[0];
  const arr = url
    .substr(0, 8)
    .split("")
    .map((i) => i.toLowerCase())
    .reverse();
  const value = arr.shift();
  if (value) arr.push(value);
  let shortUrl = arr.join("");

  if (shortUrl.length !== 8) shortUrl += makeid(8 - shortUrl.length);
  if (!(await UrlModel.exists({ shortUrl: shortUrl }))) {
    return `https://pbid.io/${shortUrl}`;
  }

  while (await UrlModel.exists({ shortUrl: shortUrl })) {
    shortUrl = makeid(8);
  }

  return `https://pbid.io/${shortUrl}`;
};

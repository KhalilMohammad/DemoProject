import express, { Request } from "express";
import urlExist from "url-exist";

import { UrlModel } from "../database/models/url/url.model";
import { ILinkQuery, IPaginationQuery } from "./types";
import { URL } from "url";

const router = express.Router();

const makeid = (length: number) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
};

const createShortLink = async (orignalUrl: string) => {
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
    return shortUrl;
  }

  while (await UrlModel.exists({ shortUrl: shortUrl })) {
    shortUrl = makeid(8);
  }

  return shortUrl;
};

router.get(
  "/",
  async (
    req: Request<{ [key: string]: string }, unknown, unknown, IPaginationQuery>,
    res
  ) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    UrlModel.find((findError, links) => {
      if (findError)
        res.send(500).json({ status: "Error occured while fetching data" });
      else {
        UrlModel.countDocuments({}, (countError, count) => {
          if (countError)
            res.send(500).json({ status: "Error occured while fetching data" });
          res.send({
            items: links,
            totalRows: count,
          });
        });
      }
    })
      .limit(10)
      .skip((pageNumber - 1) * 10);
  }
);

router.post(
  "/",
  async (
    req: Request<{ [key: string]: string }, unknown, unknown, ILinkQuery>,
    res
  ) => {
    try {
      // Check if url is not empty
      if (!req.query.orignalUrl) res.status(400).send("Url is required");
      else {
        // Check if url works
        if (urlExist(req.query.orignalUrl)) {
          // Check if url exist in database
          if (
            await UrlModel.exists({
              orignalUrl: req.query.orignalUrl,
            })
          ) {
            res.status(400).send("Cannot insert duplicate");
          } else {
            await UrlModel.create({
              orignalUrl: req.query.orignalUrl,
              shortUrl: "",
              createdOn: new Date(),
            });
            const shortUrl = await createShortLink(req.query.orignalUrl);

            UrlModel.updateOne(
              { orignalUrl: req.query.orignalUrl },
              { shortUrl: "https://pbid.io/" + shortUrl },
              (err) => {
                if (err)
                  res.status(500).send("Error occured while saving shortUrl");
                else res.sendStatus(200);
              }
            );
          }
        } else res.status(400).send("Url does not work");
      }
    } catch (error) {
      res.status(500).send("Error occured while saving data");
    }
  }
);

export default router;

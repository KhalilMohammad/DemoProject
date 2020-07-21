import express, { Request } from "express";
import urlExist from "url-exist";

import { UrlModel } from "../database/models/url/url.model";
import { ILinkQuery, IPaginationQuery } from "./types";
import { createShortLink } from "../database/models/url/url.method";

const router = express.Router();

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
              { shortUrl },
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

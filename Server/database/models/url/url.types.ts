import { Document, Model } from "mongoose";

export interface ILink {
  orignalUrl: string;
  shortUrl: string;
  createdOn: Date;
}

export interface ILinkDocument extends ILink, Document { }
export type ILinkModel = Model<ILinkDocument>

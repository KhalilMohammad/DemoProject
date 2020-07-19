import { model } from "mongoose";
import { ILinkDocument } from "./url.types";
import UrlSchema from "./url.schema";

export const UrlModel = model<ILinkDocument>("url", UrlSchema);

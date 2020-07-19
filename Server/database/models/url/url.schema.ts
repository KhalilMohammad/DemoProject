import { Schema } from "mongoose";

const UrlSchema = new Schema({
  orignalUrl: String,
  shortUrl: String,
  createdOn: Date,
});

export default UrlSchema;

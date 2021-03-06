import mongoose from "mongoose";

export let database: mongoose.Connection;
let count = 0;

export const connect = (): Promise<void> | undefined => {
  // add your own uri below
  const uri = globalThis.process.env.db_url
    ? globalThis.process.env.db_url
    : `mongodb://localhost:27017/testdb`;
  if (database) {
    return;
  }

  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((instance) => {
      count = 0;
      database = instance.connection;
      database.once("open", async () => {
        console.log("Connected to database");
      });
      database.on("error", () => {
        console.log("Error connecting to database");
      });
    })
    .catch(() => {
      console.log(`Retrying to connect to database ${++count} time`);
      return connect();
    });
};

export const disconnect = (): void => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
  return;
};

import supertest from "supertest";
import mongoUnit from "mongo-unit";

import { disconnect, database } from "../database/database";
import app from "../app";
import { createShortLink } from "../database/models/url/url.method";

const testDbName = "unit_testing_db";

beforeAll(async () => {
  jest.setTimeout(3 * 60 * 1000);
  const url = await mongoUnit.start({
    dbName: testDbName,
  });
  console.log("fake mongo is started: ", url);
  process.env.db_url = url;
});

afterAll(async () => {
  await database.db.dropDatabase();
  disconnect();
  await mongoUnit.stop();
});

describe("Test empty Link route", () => {
  test("Test empty Get all link route", async () => {
    const response = await supertest(app).get("/link");
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("items");
    expect(response.body).toHaveProperty("totalRows");
    expect(response.body.totalRows).toEqual(0);
    expect(response.body.items).toStrictEqual([]);
  });

  test("Test Post link", async () => {
    const response = await supertest(app).post(
      `/link?orignalUrl=${encodeURIComponent("https://facebook.com")}`
    );
    expect(response.status).toEqual(200);
  });

  test("Test Link route with data", async () => {
    const response = await supertest(app).get("/link");
    expect(response.status).toEqual(200);
    expect(response.body.items.length).toEqual(1);
    expect(response.body.totalRows).toEqual(1);
  });

  test("Test short link creation", async () => {
    const url = await createShortLink("https://google.com");
    expect(url).toMatch(/https:\/\/pbid.io\//i);
    const prefix = "https://pbid.io/";
    expect(url.substring(prefix.length).length).toEqual(8);
    expect(url).toMatch(/^[a-z0-9:/.]*$/);
  });
});

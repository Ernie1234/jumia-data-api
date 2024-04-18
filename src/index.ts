import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

import router from "./routes/products";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

// using puppeteer to scrape jumia
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.jumia.com/");

  await browser.close();

  app.use("/", router);
})();

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}/`);
});

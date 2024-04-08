import express from "express";
import cors from "cors";
import request from "request";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

const API_KEY = "6dc1072528e57eb4c506276efbaa3efb";
const BASE_URL = `http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//GET PRODUCT DETAILS
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  const site = "https://www.jumia.com.ng/";
  const url = `${BASE_URL}&url=${site}/${productId}`;

  try {
    const resp = await axios(url);
    res.send(resp.data);
  } catch (error) {
    res.json(error);
  }
});

// GET RATING LIST OF VERIFIED USERS
app.get("/catalog/:productId", async (req, res) => {
  const { productId } = req.params;

  const site = "https://www.jumia.com.ng/sku";
  const url = `${BASE_URL}&url=${site}/${productId}`;

  try {
    const resp = await axios(url);
    res.send(resp.data);
  } catch (error) {
    res.json(error);
  }
});
app.get("/search/:searchId", async (req, res) => {
  const { searchId } = req.params;

  const site = "https://www.jumia.com.ng/catalog";
  const url = `${BASE_URL}&url=${site}/?q=${searchId}`;

  try {
    const resp = await axios(url);
    res.send(resp.data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}/`);
});

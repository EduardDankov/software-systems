import express from "express";
import dotenv from "dotenv";

import {routes} from "./routes";

import {dropApiCallNotFound} from "./controllers/error.controller";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.use('/api/v1', routes);

// 404
app.use(dropApiCallNotFound);

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}.`);
});

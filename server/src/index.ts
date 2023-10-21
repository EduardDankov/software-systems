import express from "express";
import dotenv from "dotenv";

import {routes} from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}.`);
});

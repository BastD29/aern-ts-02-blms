import express from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./config/environments";
import { corsOptions } from "./config/cors";
import mission from "./routes/mission";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/missions", mission);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, ${NODE_ENV} environment`);
});

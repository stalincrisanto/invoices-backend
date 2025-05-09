import express from "express";
import router from "./src/routes";
import { testConnection } from "./src/config/db";

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(process.env.PORT_SERVER, () => {
  // testConnection();
  console.log(`server listening on port ${process.env.PORT_SERVER}`);
});

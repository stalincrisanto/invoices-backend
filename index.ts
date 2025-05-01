import express from "express";
import router from "./src/routes";

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

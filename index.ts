import express from "express";
import router from "./src/routes";
import { testConnection } from "./src/config/db";
import cors from "cors";
import { sessionMiddleware } from "./src/config/sessions";

const app = express();

const corsOptions = {
  origin: '*',//TODO: change this to specific domains in production
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(sessionMiddleware);
app.use("/api", router);

app.listen(process.env.PORT_SERVER, () => {
  // testConnection();
  console.log(`server listening on port ${process.env.PORT_SERVER}`);
});

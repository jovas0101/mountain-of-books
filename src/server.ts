import express from "express";
import { router } from "./routes";
const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  return res.json({ message: "welcome to mountain of books!" });
});

app.listen(3030, () => console.log("http://localhost:3030"));

const express = require("express");
const port = 3000;
const app = express();
const router = require("./src/routes/router");
const cors = require("cors");
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT"]
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () => {
  console.log(`funcionandoo! http://localhost:${port}`);
});

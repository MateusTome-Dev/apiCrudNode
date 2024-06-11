const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('@prisma/client');

app.use(cors());
app.use(bodyParser.json());

const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

// ... API routes ...

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

module.exports = app;
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

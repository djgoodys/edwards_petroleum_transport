const express = require("express");

const connectDatabase = require("./database/databaseInit");
const { SERVER_PORT } = require("./constants");
const errorHandler = require("./middleware/errorHandlers");

const truckRouter = require("./routes/truckRouter");
const userRouter = require("./routes/userRouter");

const app = express();

var cors = require("cors");

app.use(cors());

connectDatabase();

app.use(express.json());
app.use(errorHandler);

var requestBodyParser = require("body-parser");

app.use(requestBodyParser.json({ limit: "5mb" }));
app.use(
  requestBodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use((req, res, next) => { console.log(`Incoming request: ${req.method} ${req.url}`); next(); });

app.use("/api/v1/trucks", truckRouter);
app.use("/api/v1/users", userRouter);

app.get("/PING", (_, res) => {
  res.status(200).json({
    message: "PONG",
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running at port : ${SERVER_PORT}`);
});

const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { urlencoded } = require("express");
const { registerRouter } = require("./routers/registerRouter");
const { handleError } = require("./utils/handleErrors");

const app = express();

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());
app.use("/register", registerRouter);

app.use(handleError);

app.listen(3000, "localhost", () => {
  console.log("Server is running on localhost");
});

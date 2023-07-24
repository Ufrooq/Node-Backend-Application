const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const connection = require("./Config/DbConnection");
 
connection();
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

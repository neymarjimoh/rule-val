const express = require("express");
const { PORT } = require("./config");
const indexRouter = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//basic routes declarations
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});

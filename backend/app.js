import express from "express";

const app = express();
const PORT = 3000;

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, (e) => {
  if (e) {
    throw e;
  }

  console.log(`Listening on port ${PORT}!`)
});
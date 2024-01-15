import express from "express";
import cors from "cors";
import "./loadEnviroment.mjs";
import fields from "./routes/fields.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /fields routes
app.use("/fields", fields);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
import express from "express";
import "dotenv/config";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";

const app = express();

const coreOptions = {
  origin: "http://127.0.0.1:5500", // Your frontend origin
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Serve static files from the public directory
app.use(express.static(join(__dirname, "public")));
app.use(cors(coreOptions));

const port = process.env.PORT;
const api = "https://api.openweathermap.org/data/2.5/weather?";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/weather", async (req, res) => {
  const apiID = process.env.APIKEY;
  const city = req.query.city;
  try {
    const { data } = await axios.get(
      `${api}&q=${city}&appid=${apiID}&units=metric`
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fecthing weather data");
  }
});
app.listen(port, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

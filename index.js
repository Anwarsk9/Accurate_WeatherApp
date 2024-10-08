import express from "express";
import "dotenv/config";
import axios from "axios";
import cors from "cors";

const app = express();

const coreOptions = {
  origin: "http://127.0.0.1:5500", // Your frontend origin
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(coreOptions));

const port = 3000;
const api = "https://api.openweathermap.org/data/2.5/weather?";
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
app.listen(port, () => console.log("App is listening"));

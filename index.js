const express = require("express");
const app = express();
const cors = require("cors");
const port = 3005;

const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/city", async (req, res) => {
    try {
      const { cityname } = req.body;
      const newCity = await pool.query(
        "INSERT INTO city (cityname) VALUES($1) RETURNING *",
        [cityname]
      );
      res.json(newCity.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });


app.get("/city", async (req, res) => {
    try {
      const selectCity = await pool.query(
        "SELECT *FROM city ORDER BY RANDOM() LIMIT 1"
      );
  
      res.json(selectCity.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));